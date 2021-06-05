export default class Creditos extends Phaser.Scene
{
    constructor()
    {
        super('Creditos')
    }
    preload()
    {

    }
    create()
    {
        let texto = "Jogo feito por michelzinho"
        this.add.text(200,300,texto,{fontSize: '34px',fill: '#ce7f24'})

        let btnVoltar = this.add.text(0,0,'voltar',{fontSize:'34px',fill: '#ce7f24'})
        btnVoltar.setInteractive({useHandCursor:true})
        btnVoltar.on('pointerdown', function(){
            this.scene.start('Menu')
        },this)
    }
}