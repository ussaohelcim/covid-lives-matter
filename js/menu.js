export default class Menu extends Phaser.Scene
{
    constructor()
    {
        super('Menu');
    }
    preload()
    {
        this.load.image('titulo','img/gameTitle.jpg')
        this.load.image('btnIniciar','img/btnIniciar.gif')
        this.load.image('btnInstrucoes','img/btnInstrucoes.gif')

        this.load.audio('menu','audio/menu.wav')
    }
    create()
    {
        this.musicaFundo = this.sound.add('menu')
        
        this.musicaFundo.play()
        
        let highscore = localStorage.getItem('highscore')
        let txtHIghscore = this.add.text(400,this.cameras.main.height-400,"HIGHSCORE: "+highscore,
                                        {fontSize:'40px',color:'#FFF'})
        txtHIghscore.x = this.cameras.main.width/2 - txtHIghscore.width/2
        
        
        let titulo = this.add.sprite(0,250,'titulo')
        titulo.x = this.cameras.main.width/2 

        let btnInstrucoes = this.add.text(this.cameras.main.width/2,
            this.cameras.main.height-100,'Instructions',
            {align:'center',fontSize:'40px',fill:'#ce7f24'}) ;
        btnInstrucoes.x -= btnInstrucoes.width/2;
        btnInstrucoes.setInteractive({useHandCursor:true})
        btnInstrucoes.on('pointerdown', () => this.showInstructions());
        btnInstrucoes.on('pointerover',function(){
            btnInstrucoes.setBackgroundColor('#333')},this)
        btnInstrucoes.on('pointerout',function(){
            btnInstrucoes.setBackgroundColor('#000')},this)

        let btnIniciar = this.add.text(this.cameras.main.width/2,
                            this.cameras.main.height-200,'Start',
                    {align:'center',fontSize:'40px',fill:'#ce7f24'});
        btnIniciar.x -= btnIniciar.width/2;
        btnIniciar.setInteractive({useHandCursor:true});
        btnIniciar.on('pointerdown', function(){this.startGame()},this);
        btnIniciar.on('pointerover',function(){
            btnIniciar.setBackgroundColor('#333')},this)
        btnIniciar.on('pointerout',function(){
            btnIniciar.setBackgroundColor('#000')},this)

        let btnCreditos = this.add.text(this.cameras.main.width/2,
                this.cameras.main.height-150,'Credits',
        {align:'center',fontSize:'40px',fill:'#ce7f24'});
        btnCreditos.x -= btnCreditos.width/2;
        btnCreditos.setInteractive({useHandCursor:true});
        btnCreditos.on('pointerdown', function(){this.credits()},this);
        btnCreditos.on('pointerover',function(){
            btnCreditos.setBackgroundColor('#333')},this)
        btnCreditos.on('pointerout',function(){
            btnCreditos.setBackgroundColor('#000')},this)

        let btnRepositorio = this.add.text(0,0,"Source code",
                            {fontSize: '40px',fill: '#ce7f24'})
        btnRepositorio.setInteractive({useHandCursor:true})
        btnRepositorio.on('pointerdown',this.goToRepository,this)
        btnRepositorio.on('pointerover',function(){
            btnRepositorio.setBackgroundColor('#333')},this)
        btnRepositorio.on('pointerout', function(){
            btnRepositorio.setBackgroundColor('#000')},this)

        this.cameras.main.setBackgroundColor("#000")
    }
    update()
    {
        this.musicaFundo.once('complete', ()=>{
            this.musicaFundo.play()
        })
    }
    startGame()
    {   
        this.musicaFundo.stop()
        this.scene.start('Fases',{fase:'fase1'})
    }
    showInstructions()  
    {   
        this.musicaFundo.stop()
        this.scene.start('Instrucoes')
    }
    goToRepository()
    {   
        window.open('https://github.com/ussaohelcim/covid-lives-matter')
    }
    credits()
    {   
        this.musicaFundo.stop()
        this.scene.start('Creditos')
    }

}