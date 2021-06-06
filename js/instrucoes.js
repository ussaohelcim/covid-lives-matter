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
        let texto = this.add.text(200,100,`Control the Covid-19
and try to survive in a world
full of vaccine, faceshields and hand sanitizers.


Jump on top of people to infect them
and increase you life time.

Deviate from the other objects.

Use the keyboard arrows to control.`,{fontSize: '40px',fill: '#ce7f24'})
        texto.x = this.cameras.main.midPoint.x - texto.width /2

        let btnVoltar = this.add.text(0,0,'back',{fontSize:'34px',fill: '#ce7f24'})
        btnVoltar.setInteractive({useHandCursor:true})
        btnVoltar.on('pointerdown', function(){
            this.scene.start('Menu')
        },this)
        btnVoltar.on('pointerover',function(){
            btnVoltar.setBackgroundColor('#333')
        },this)
        btnVoltar.on('pointerout', function(){
            btnVoltar.setBackgroundColor('#000')},this)

        this.cameras.main.setBackgroundColor("#000");
    }
}