export default class Menu extends Phaser.Scene
{
    constructor()
    {
        super('Menu');
    }
    preload()
    {
        this.load.image('logo','img/logo.gif')
        this.load.image('titulo','img/gameTitle.gif')
        this.load.image('btnIniciar','img/btnIniciar.gif')
        this.load.image('btnInstrucoes','img/btnInstrucoes.gif')
    }
    create()
    {
        let logo = this.add.sprite(400,100,'logo')
        
        let titulo = this.add.sprite(400,250,'titulo')

        let btnInstrucoes = this.add.text(this.cameras.main.width/2,
            this.cameras.main.height-100,'Instrucoes',
            {align:'center',fontSize:'30px',fill:'#ce7f24'}) ;
        btnInstrucoes.x -= btnInstrucoes.width/2;
        btnInstrucoes.setInteractive({useHandCursor:true})
        btnInstrucoes.on('pointerdown', () => this.showInstructions());
        btnInstrucoes.on('pointerover',function(){
            btnInstrucoes.setBackgroundColor('#000')},this)
        btnInstrucoes.on('pointerout',function(){
            btnInstrucoes.setBackgroundColor('#b0e2f0')},this)

        let btnIniciar = this.add.text(this.cameras.main.width/2,
                            this.cameras.main.height-200,'Iniciar',
                    {align:'center',fontSize:'30px',fill:'#ce7f24'});
        btnIniciar.x -= btnInstrucoes.width/2;
        btnIniciar.setInteractive({useHandCursor:true});
        btnIniciar.on('pointerdown', function(){this.startGame()},this);
        btnIniciar.on('pointerover',function(){
            btnIniciar.setBackgroundColor('#000')},this)
        btnIniciar.on('pointerout',function(){
            btnIniciar.setBackgroundColor('#b0e2f0')},this)

        let btnRepositorio = this.add.text(0,0,"Repositorio",
                            {fontSize: '34px',fill: '#ce7f24'})
        btnRepositorio.setInteractive({useHandCursor:true})
        btnRepositorio.on('pointerdown',this.goToRepository,this)
        btnRepositorio.on('pointerover',function(){
            btnRepositorio.setBackgroundColor('#000')},this)
        btnRepositorio.on('pointerout', function(){
            btnRepositorio.setBackgroundColor('#b0e2f0')},this)
        
    }
    startGame()         {   this.scene.start('Fases',{fase:'fase1'})}
    showInstructions()  {   this.scene.start('Instrucoes')}
    goToRepository()    {   window.open('https://github.com/ussaohelcim/covid-game')}

}