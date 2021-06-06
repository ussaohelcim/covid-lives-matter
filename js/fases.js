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

        //audios
        this.load.audio('partida','audio/partida.wav')
        this.load.audio('perdeu','audio/perdeu.wav')
        this.load.audio('maisVida','audio/maisVida.wav')
        this.load.audio('novoRecorde','audio/novoRecorde.wav')

    }
    create()
    {
        this.highscore = localStorage.getItem('highscore');
        this.score = 0;
        this.segundos = 0;
        this.chao = this.physics.add.staticGroup();//coloca o chao no grupo de objetos estaticos
        this.chao.create(0,this.cameras.main.height,'chao');//cria o chão


        // this.chao.setOrigin(0,1)
        // //this.plataforma = this.physics.add.staticGroup();
        

         //jogador
        this.jogador = this.physics.add.sprite(this.cameras.main.midPoint.x,this.cameras.main.midPoint.y,'coronga');
        this.jogador.setCollideWorldBounds(true)
        this.jogadorVivo = true
        this.velocidade = 200;
        this.setas = this.input.keyboard.createCursorKeys();
        this.tempoVida = 30000;
        this.temporizador = this.time.addEvent({delay:this.tempoVida, callback: this.Morrer, callbackScope:this},this);
        this.vitima = "";
        this.parasitando = false;
        this.noChao = false;

        this.physics.add.collider(this.jogador,this.chao, a => {//colisao do jogador com o chao
            this.noChao = true
        })
        
        // this.CriarFase()
        // this.SetarColisores()

        //textos
        this.hud = this.add.text(10,10).setScrollFactor(0).setFontSize(40).setColor('#000') 
        this.hud.text = "score: "
        

        this.hudJogador = this.add.text(0,0,'x: '+this.jogador.x+'y: '+this.jogador.y,{fontSize: '25px',fill: '#000'});
        //this.vacinaTimer = this.time.addEvent({delay:1000,callback:this.SpawnarVacina, callbackScope:this},this)

        //this.vacina ;
        
        //this.SpawnarPessoa()
        //this.SpawnarVacina()
        //this.SpawnarAlcoolGel()
        this.Spawnador();
        this.Relogio();
        this.musicaJogo = this.sound.add('partida')
        this.musicaJogo.play()

        this.musicaDerrota = this.sound.add('perdeu')
        this.musicaMaisVida = this.sound.add('maisVida')
        this.musicaNovoRecorde = this.sound.add('novoRecorde')

        this.mostrouRecorde = false

        this.cameras.main.setBackgroundColor("#44A")

        this.rotacao = 0;
    }
    update()
    {
        this.ControleJogador();
        this.DesenharUI();
        this.DiminiuirTamanho()
        this.musicaJogo.once('complete',()=>{
            this.musicaJogo.play()
        })
        this.musicaDerrota.once('complete', ()=>{
            this.musicaDerrota.play()
        })
        this.jogador.setAngle(this.rotacao)
        //this.Touchscreen()
        
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
            let tempo = Phaser.Math.Between(100,2000)
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
        mascara.setVelocityY(-100)
        this.physics.add.collider(mascara,this.jogador,()=>{
            this.temporizador.elapsed += 5000
            mascara.destroy();
        })

        this.physics.add.collider(mascara,this.chao,a =>{
            mascara.setAlpha(0.3)
            mascara.body.enable = false;
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
        let contaminouPessoa = false
        this.physics.add.overlap(this.jogador,pessoa, ()=>{
            if(tocouChao && this.jogador.body.touching.down && !this.noChao)
            {
                //tocar som
                
                this.novoTemporizador();
                //pessoa.destroy();
                pessoa.body.enable = false
                pessoa.setAlpha(0.5)
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
        if(gel.x >= this.jogador.x)
        {
            gel.setVelocityX(-300)
        }
        else
        {
            gel.setVelocityX(300)

        }
        this.physics.add.overlap(this.jogador,gel, a=>{
            this.velocidade = 50;
            console.log("tocando no gel")
            let timer = this.time.delayedCall(1000,()=>{
                this.velocidade = 200;
                gel.destroy();
                timer.destroy();
            })
        })
        this.physics.add.collider(gel,this.chao,a =>{})
    }
    SpawnarVacina()
    {
        let local = Phaser.Math.Between(10,window.innerWidth)
        let vacina = this.physics.add.sprite(this.jogador.x,0,'vacina')
        let tocandoAudio = false;
        vacina.body.setSize(20,80)
        vacina.setVelocityY(100)

        this.physics.add.collider(this.jogador,vacina, ()=>{
            //tocar som
            this.temporizador.elapsed += Number.MAX_VALUE
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
                this.rotacao-=3;
                
            } else if (this.setas.right.isDown) {
                this.jogador.setVelocityX(this.velocidade);
                this.rotacao+=3;
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
        this.musicaMaisVida.play();
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
        this.musicaJogo.stop()

        this.musicaDerrota.play()

        
        this.DispararAviso()
    }
    DispararAviso()
    {
        this.mensagem = this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y,"Did you see? If the virus \nthe virus couldnt infect anyone, \nafter a time, it dies.\nIf we work together, \nwe will exterminate this problem.", {color:"#00000",fontSize: '40px' })  
        this.mensagem.setOrigin(0.5,0.5)
        //Did you see? If the virus couldnt infect anyone, after a time, it dies. If we work together, we will exterminate this problem.

        let r = this.add.text(this.cameras.main.midPoint.x, this.cameras.main.midPoint.y+150,"Clique aqui para recomeçar",{fontSize:"40px",fill:"#000"})
        r.x = this.cameras.main.midPoint.x - r.width /2
        r.setInteractive({useHandCursor:true})
        r.on('pointerdown',()=>{
            this.musicaDerrota.stop()
            this.scene.start('Fases',{fase:'fase1'})
        })


    }


    //UI
    DesenharUI()
    {

        if(this.score > localStorage.getItem('highscore'))
        {
            this.hud.text = "score: "+this.score+" <<<< NOVO RECORD";
            
            if(!this.mostrouRecorde)
            {
                this.mostrouRecorde = true
                this.musicaNovoRecorde.play();
            }
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
            this.hudJogador.text  = "O virus morreu."
        }
    }
    Relogio()
    {
        if(this.jogadorVivo)
        {
            let timer = this.time.delayedCall(1000,t =>{

                if(this.segundos==60)
                {
                    this.segundos = 0;
                    this.novoTemporizador();
                }
                else this.segundos++

                this.score++;
                timer.destroy()
                this.Relogio();
            })
        }      


    }
    Touchscreen()
    {
        let esquerda = this.add.rectangle(0,0,this.cameras.main.displayWidth,window.innerHeight)
        esquerda.colo
        esquerda.setAlpha(0.1)
    }

}
