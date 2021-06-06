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
        let texto = this.add.text(200,100,`Controle o virus da Covid-19
e tente sobreviver em um mundo
repleto de vacinas, mascaras e alcool-gel.

Pule em cima de pessoas para infecta-las
e ganhar mais tempo de vida.

Desvie dos outros objetos.

Utilize as setas para controlar.`,{fontSize: '40px',fill: '#ce7f24'})
        texto.x = this.cameras.main.midPoint.x - texto.width /2

        let btnVoltar = this.add.text(0,0,'voltar',{fontSize:'34px',fill: '#ce7f24'})
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