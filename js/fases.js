export default class Fases extends Phaser.Scene
{
    constructor()
    {
        super('Fases');
    }
    init(qual)
    {
        //let r = new Randomico()
    }
    preload()
    {
        this.load.image('vacina','img/vacina.gif')
        this.load.image('vacinaQuebrado','img/vacinaQuebrado.gif')
        this.load.audio('vacinaA','audio/vacina.ogg')

        this.load.image('mascara','img/mascara.gif')

        this.load.image('alcoolgel','img/alcoolgel.gif')
        this.load.image('alcoolgelQuebrado','img/alcoolgelQuebrado.gif')
        this.load.image('gel','img/gel.gif')
        this.load.audio('alcoolgelA','audio/alcoolgel.ogg')

        this.load.image('pessoa','img/pessoa.gif')        
        this.load.image('pessoaCaiu','img/pessoaCaiu.gif')    
        this.load.audio('pessoaA','audio/pessoa.ogg')

        this.load.image('chao','img/chao.gif')

        this.load.image('coronga','img/coronga.gif');

    }
    create()
    {
        this.highscore = localStorage.getItem('highscore');
        this.score = 0;

        this.chao = this.physics.add.staticGroup();
        this.chao.create(0,this.cameras.main.height,'chao');
        // this.chao.setOrigin(0,1)
        // //this.plataforma = this.physics.add.staticGroup();
        

         //jogador
        this.jogador = this.physics.add.sprite(0,0,'coronga');
        this.jogador.setCollideWorldBounds(true)
        this.jogadorVivo = true
        this.velocidade = 200;
        this.setas = this.input.keyboard.createCursorKeys();
        this.tempoVida = 30000;
        this.temporizador = this.time.addEvent({delay:this.tempoVida, callback: this.Morrer, callbackScope:this},this);
        this.vitima = "";
        this.parasitando = false;
        this.noChao = false;

        this.physics.add.collider(this.jogador,this.chao, a =>{
            this.noChao = true
        })
        
        // this.CriarFase()
        // this.SetarColisores()

        //textos
        this.hud = this.add.text(10,10).setScrollFactor(0).setFontSize(40).setColor('#000') 
        this.hud.text = "score: "

        this.hudJogador = this.add.text(0,0,'x: '+this.jogador.x+'y: '+this.jogador.y,{fontSize: '12px',fill: '#FFF'});
        //this.vacinaTimer = this.time.addEvent({delay:1000,callback:this.SpawnarVacina, callbackScope:this},this)

        //this.vacina ;
        
        //this.SpawnarPessoa()
        //this.SpawnarVacina()
        //this.SpawnarAlcoolGel()
        this.Spawnador();
        this.Relogio();
        
    }
    update()
    {
        this.ControleJogador();
        this.DesenharUI();
        this.DiminiuirTamanho()

    }
    DerramarGel()
    {
        let posX, posY, largura, altura
        largura = window.innerWidth / 8
        altura = 20
        posY = window.innerHeight - altura
        let esquerda = this.add.rectangle(posX,posY,largura,altura,0x0000AA)
        let direita = this.add.rectangle(largula+posX,posY,largura,altura,0x0000AA)
        direita.x++;
        esquerda.x--;
    }
    Spawnador()
    {
        if(this.jogadorVivo)
        {
            let tempo = Phaser.Math.Between(100,5000)
            let timer = this.time.delayedCall(tempo,()=>{
                let opcao = Phaser.Math.Between(0,3)
                console.log("opcao ",opcao)
                switch (opcao) {
                    case 0:
                        this.SpawnarAlcoolGel()
                        console.log("spawnow alcool em gel")
                        break;
                    case 1:
                        this.SpawnarMascara()
                        console.log("spawnow mascara")
                        break;
                    case 2:
                        this.SpawnarVacina()
                        console.log("spawnow vacinha")
                        break;
                    case 3:
                        this.SpawnarPessoa()
                        console.log("spawnow pessoa")
                        break;
                }
                this.Spawnador()
            })
        }
    

    }
    SpawnarMascara()
    {
        let local = Phaser.Math.Between(10,window.innerWidth)
        let mascara = this.physics.add.sprite(local,0,'mascara')
        this.physics.add.collider(mascara,this.chao,a =>{
            mascara.setAlpha(0.3)
            let timer = this.time.delayedCall(3000,()=>{
                mascara.destroy();
                timer.destroy();
            })
        })
    }
    SpawnarPessoa()
    {
        let local = Phaser.Math.Between(10,window.innerWidth)
        let pessoa = this.physics.add.sprite(local,0,'pessoa')
        let tocouChao = false
        let tocandoAudio = false
        this.physics.add.overlap(this.jogador,pessoa, ()=>{
            if(tocouChao && this.jogador.body.touching.down && !this.noChao)
            {
                //tocar som
                this.novoTemporizador();
                pessoa.destroy();
            }
        })
        this.physics.add.collider(pessoa,this.chao,a =>{
            if(!tocandoAudio)
            {
                this.sound.play('pessoaA')
                tocandoAudio = true
            }
            
            pessoa.setTexture('pessoaCaiu')
            //tocar som
            tocouChao = true
            let timer = this.time.delayedCall(3000,()=>{
                pessoa.destroy();
                timer.destroy();
            })

        })
    }
    SpawnarAlcoolGel()
    {
        let local = Phaser.Math.Between(10,window.innerWidth)
        let alquimGel = this.physics.add.sprite(local,0,'alcoolgel')
        let tocandoAudio = false
        this.physics.add.collider(alquimGel,this.chao,a =>{
            //tocar som
            if(!tocandoAudio)
            {
                this.sound.play('alcoolgelA')
            }
            alquimGel.body.enable = false;
            alquimGel.setTexture('alcoolgelQuebrado')
            alquimGel.setVelocityY(-400)
            alquimGel.setAlpha(0.3)
            this.SpawnarGel(alquimGel.x,alquimGel.y)
            let timer = this.time.delayedCall(1000,()=>{
                alquimGel.destroy()
                timer.destroy()
            })
            
        })
        

    }
    SpawnarGel(x,y)
    {
        let gel = this.physics.add.sprite(x,y+30,'gel')
        this.physics.add.overlap(this.jogador,gel, a=>{
            this.velocidade = 50;
            console.log("tocando no gel")
            let timer = this.time.delayedCall(1000,()=>{
                gel.destroy();
                timer.destroy();
                this.velocidade = 200;
            })
        })
        this.physics.add.collider(gel,this.chao,a =>{})
    }
    SpawnarVacina()
    {
        let local = Phaser.Math.Between(10,window.innerWidth)
        let vacina = this.physics.add.sprite(local,0,'vacina')
        let tocandoAudio = false;
        vacina.body.setSize(20,80)
        vacina.setVelocityY(100)

        this.physics.add.collider(this.jogador,vacina, ()=>{
            //tocar som
            this.temporizador.elapsed += this.temporizador.elapsed;
        })
        this.physics.add.collider(vacina, this.chao, ()=>{
            if(!tocandoAudio)
            {
                this.sound.play('vacinaA')
            }
            vacina.body.enable = false;
            vacina.setVelocityY(-400)
            vacina.setTexture('vacinaQuebrado')
            vacina.setAlpha(0.5);
            let timer = this.time.delayedCall(1000,()=>{
                vacina.destroy()
                timer.destroy();
            })
        })
    }

    // jogador
    ControleJogador()
    {
        if(this.jogadorVivo)
        {
            if (this.setas.left.isDown) {
                this.jogador.setVelocityX(-this.velocidade);
            } else if (this.setas.right.isDown) {
                this.jogador.setVelocityX(this.velocidade);
            } else {
                this.jogador.setVelocityX(0);
            }

            if(this.setas.up.isDown && this.jogador.body.touching.down)
            {
                this.jogador.setVelocityY(-550);
                this.noChao = false
            }
        }
        else
        {
            this.jogador.setVelocityX(0)
        }
    }
    getTempoDeVida()
    {
        return (Math.ceil((this.tempoVida - Math.ceil(this.temporizador.elapsed))/1000))
    }
    novoTemporizador()
    {
        this.temporizador.elapsed -= 6000
    }
    DiminiuirTamanho()
    {
        if(this.jogadorVivo)
        {
            if(this.getTempoDeVida() < 10)
            {
                this.jogador.scale = this.getTempoDeVida()/10
            }
            else
            {
                this.jogador.scale = 1
            }
        }
        else
        {
            this.jogador.scale = 0
        }
    }
    Morrer()
    {
        this.jogadorVivo = false;
        if(localStorage.getItem('highscore') == null)
        {
            localStorage.setItem('highscore',this.score)
        }
        else
        {
            if(this.score > localStorage.getItem('highscore'))
            {
                localStorage.setItem('highscore',this.score)
            }

        }
        //this.DispararAviso()
    }
    DispararAviso()
    {
        this.mensagem = this.add.text(this.cam.midPoint.x, this.cam.midPoint.y,"Viu só? Caso o virus não consiga infectar ninguem, após um tempo ele morre.\nSe todos trabalharmos juntos, iremos conseguir exterminar este problema.\nEvite acumulações, use mascara.", {color:"#00000",fontSize: '30px' ,wordWrap: 300 })  
        this.mensagem.setOrigin(0.5,0.5)
    }


    //UI
    DesenharUI()
    {
        
        if(this.score > localStorage.getItem('highscore'))
        {
            this.hud.text = "score: "+this.score+" <<<< NOVO RECORD";
        }
        else
        {
            this.hud.text = "score: "+this.score;
        }

        if(this.jogadorVivo)
        {
            this.hudJogador.text = "tempo restante: "+this.getTempoDeVida();
            this.hudJogador.x = this.jogador.x 
            this.hudJogador.y = this.jogador.y - this.jogador.height
        }
        else
        {
            this.hudJogador.text  = "Você morreu."
        }
    }
    Relogio()
    {
        if(this.jogadorVivo)
        {
            let timer = this.time.delayedCall(1000,t =>{
                this.score++;
                timer.destroy()
                this.Relogio();
            })
        }      

    }

}
