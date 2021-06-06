export default class SplashScreen extends Phaser.Scene
{
    constructor()
    {
        super('SplashScreen');
    }
    preload()
    {
        //this.load.image('logo','img/logo.gif')
        this.load.video('logo','img/logo.mp4')
    }
    
    create()
    {
        this.video = this.add.video(this.cameras.main.midPoint.x,this.cameras.main.midPoint.y-200,'logo')
        this.video.play(true);

        this.cameras.main.setBackgroundColor('#000')
        //console.log("chamou o create da splashscreen")
        //this.add.sprite(this.cameras.main.midPoint.x,this.cameras.main.midPoint.y,'logo')

        let btniniciar = this.add.text(this.cameras.main.midPoint.x,this.cameras.main.midPoint.y+200,"Click here to start.",{align:'center', fontSize: '30px',fill:'#ce7f24'})
        btniniciar.x -= btniniciar.width /2

        btniniciar.setInteractive({useHandCursor:true})
        btniniciar.on('pointerdown', function(){
            this.scene.start('Menu')
            console.log("apertou")
        },this)
        btniniciar.on('pointerover',function(){
            btniniciar.setBackgroundColor('#333')
        },this)
        btniniciar.on('pointerout', function(){
            btniniciar.setBackgroundColor('#000')},this)
    }
    irProMenu()
    {    
        this.video.stop()
        this.scene.start('Menu');
        console.log("pediu pra ir pro menu");
    }
    
}