class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.perdut = false;
    }	

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
	}
	
    create (){

		let carts = ['co', 'co', 'cb', 'cb', 'sb', 'sb', 'so', 'so', 'tb', 'tb', 'to', 'to'];
		this.cameras.main.setBackgroundColor(0xD8D4EC);
		var json = sessionStorage.getItem("config") || '{"cards":2, "time_out":3000, "perdrePunts":5}';
		var options_data = JSON.parse(json);
		var coincidents = options_data.cards;
		var dificultat = options_data.dificulty;
		var time_out = options_data.time_out;
		var puntuacio_perduda = options_data.perdrePunts;
		var arraycards = carts.slice(0, coincidents * 2)

		
		this.score = 100;
		var a = 0;

		arraycards.sort((a, b) => 0.5 - Math.random());

		this.cards = this.physics.add.staticGroup();

		for (let iterador = 0; iterador < coincidents*2; iterador++){
				this.add.image(iterador*125 + 50, 300, arraycards[iterador]);
				this.cards.create(iterador*125 + 50, 300, 'back');
		}

		let i = 0;
		
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);

				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= puntuacio_perduda;
						this.firstClick.enableBody(false, 0, 0, true, true);

						card.enableBody(false, 0, 0, true, true);

						var error = [];

						for(let i = 0; i < coincidents*2; i++){
							let imatge = this.add.image(i*125 + 50, 300, arraycards[i]);
							error.push(imatge);
						}
					
						setTimeout(() =>{
							for (let iterador = 0; iterador < coincidents*2; iterador++){
								error[iterador].destroy();
							}
						},time_out);



						if (this.score <= 0){
							alert("Game Over");

							options_data.cards = 2;
							options_data.perdrePunts = 5;	
							options_data.time_out = 3000;


							sessionStorage.setItem("config", JSON.stringify(options_data));
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= coincidents){
							this.correct = 0;
							if (coincidents < 6) coincidents++;
							
							if (time_out > 500) time_out -= 500;
							puntuacio_perduda += 5;

							options_data.cards = coincidents;
							options_data.perdrePunts = puntuacio_perduda;
							options_data.time_out = time_out;
							
							
							sessionStorage.setItem("config", JSON.stringify(options_data));
							this.scene.restart();
							
						}
					}
					this.firstClick = null;
				}
				else{
				
					this.firstClick = card;
				}
			}, card);
		});
	}
	
//	update (){	}
}