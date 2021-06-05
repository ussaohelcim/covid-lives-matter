export default class Instrucoes extends Phaser.Scene
{
    constructor()
    {
        super('Instrucoes')
    }
    preload()
    {
        this.load.image('logo','img/logo.gif')
        console.log("criou a cena de instrucoes")
    }
    create()
    {
        //this.add.sprite(400,300,'logo')
        let texto = "Use as setas para jogar"
        this.add.text(200,300,texto,{fontSize: '34px',fill: '#ce7f24'})

        let btnVoltar = this.add.text(0,0,'voltar',{fontSize:'34px',fill: '#ce7f24'})
        btnVoltar.setInteractive({useHandCursor:true})
        btnVoltar.on('pointerdown', function(){
            this.scene.start('Menu')
        },this)
    }
}