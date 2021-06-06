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
        let texto = "Director: Professor Alcides.\n\nProductor: Michel Sousa.\n\nGame designer: Michel Sousa.\n\nMusic designer: Michel Sousa.\n\n:Graphic designer Michel Sousa.\n\nProgramming: Michel Sousa.\n\nSFX: opengameart"
        let txt = this.add.text(200,100,texto,{fontSize: '40px',fill: '#ce7f24'})
        txt.x = this.cameras.main.width/2 - txt.width/2

        let btnVoltar = this.add.text(0,0,'Back',{fontSize:'34px',fill: '#ce7f24'})
        btnVoltar.setInteractive({useHandCursor:true})
        btnVoltar.on('pointerdown', function(){
            this.scene.start('Menu')
        },this)
        btnVoltar.on('pointerover',function(){
            btnVoltar.setBackgroundColor('#333')},this)
        btnVoltar.on('pointerout', function(){
                btnVoltar.setBackgroundColor('#000')},this)
        this.cameras.main.setBackgroundColor("#000")
    }
}