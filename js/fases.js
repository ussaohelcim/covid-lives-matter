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

        this.load.image('mascara','img/mascara.gif')

        this.load.image('alcoolgel','img/alcoolgel.gif')
        this.load.image('alcoolgelQuebrado','img/alcoolgelQuebrado.gif')

        this.load.image('pessoa','img/pessoa.gif')        
        this.load.image('pessoaCaiu','img/pessoaCaiu.gif')    

        this.load.image('chao','img/chao.gif')
        //covidinho
        this.load.image('coronga','img/coronga.gif');

    }
    create()
    {
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
        this.tempoVida = 15000;
        this.temporizador = this.time.addEvent({delay:this.tempoVida, callback: this.Morrer, callbackScope:this},this);
        this.vitima = "";
        this.parasitando = false;
        this.noChao = false;

        this.physics.add.collider(this.jogador,this.chao, a =>{

        })
        // this.CriarFase()
        // this.SetarColisores()

        // this.cam = this.cameras.main
        // //textos
        // this.hud = this.add.text(10,10).setScrollFactor(0).setFontSize(20).setColor('#FFFFFF') 
        // this.hud.text = "score: "
        this.hudJogador = this.add.text(0,0,'x: '+this.jogador.x+'y: '+this.jogador.y,{fontSize: '12px',fill: '#FFF'});
        //this.vacinaTimer = this.time.addEvent({delay:1000,callback:this.SpawnarVacina, callbackScope:this},this)

        //this.vacina ;
        
        //this.SpawnarPessoa()
        //this.SpawnarVacina()
        //this.SpawnarAlcoolGel()
        this.Spawnador();
    }
    update()
    {
        this.ControleJogador();
        this.DesenharUI();
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
                switch (opcao) {
                    case 0:
                        this.SpawnarAlcoolGel()
                        break;
                    case 1:
                        this.SpawnarMascara()
                        break;
                    case 2:
                        this.SpawnarVacina()
                        break;
                    case 3:
                        this.SpawnarPessoa()
                        break;
                }
                this.Spawnador()
            })
        }
    

    }
    SpawnarMascara()
    {

    }
    CriarFase()
    {

    }
    SpawnarPessoa()
    {
        let pessoa = this.physics.add.sprite(500,0,'pessoa')
        this.physics.add.collider(pessoa,this.chao,a =>{
            pessoa.setTexture('pessoaCaiu')
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
        
        this.physics.add.collider(alquimGel,this.chao,a =>{
            alquimGel.setTexture('alcoolgelQuebrado')
            alquimGel.setVelocityY(-400)
            alquimGel.setAlpha(0.3)
            let timer = this.time.delayedCall(1000,()=>{
                alquimGel.destroy()
                timer.destroy()
            })
        })
        

    }
    SpawnarVacina()
    {
        let local = Phaser.Math.Between(10,window.innerWidth)
        let vacina = this.physics.add.sprite(local,0,'vacina')
        vacina.setVelocityY(100)
        //this.vacinaTimer = this.time.addEvent({delay:1000,callback:this.SpawnarVacina, callbackScope:this},this);
        this.physics.add.collider(this.jogador,vacina, ()=>{
            //this.jogadorVivo = false
            this.tempoVida =0
        })
        this.physics.add.collider(vacina, this.chao, ()=>{
            vacina.setVelocityY(-400)
            vacina.setTexture('vacinaQuebrado')
            let timer = this.time.delayedCall(1000,()=>{
                vacina.destroy()
                timer.destroy();
            })
        })
    }
    SetarColisores()
    {
        //this.physics.add.collider(this.jogador,mesa)
        //colisao com o chao
        // this.physics.add.collider(this.jogador,this.chao, colisao =>{

        // })
        // this.cenario.forEach(a =>{
        //     this.physics.add.collider(this.jogador,a)
        //     this.physics.add.collider(a,this.chao);
            
        // })

        // //colisao dos inimigos
        // for (let i = 0; i < this.inimigos.length; i++) {
        //     //inimigo com o chao
        //     this.physics.add.collider(this.inimigos[i],this.chao);

        //     this.physics.add.collider(this.jogador, this.inimigos[i], colisao =>{
        //         if(this.jogador.body.touching.down && !this.parasitando && (this.inimigos[i].tipo != 'pessoaMascara'))
        //         {
        //             console.log(this.inimigos[i].tipo)
        //             this.novoTemporizador();
        //             this.inimigos[i].setTexture('pessoaCorongada');
        //             this.inimigos[i].body.enable = false;
        //             this.parasitando = true;
        //             this.vitima = this.inimigos[i];
        //         }
                
        //     })            
        // }
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
        this.temporizador.elapsed -= 3000
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

}
