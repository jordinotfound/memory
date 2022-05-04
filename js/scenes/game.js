class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
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
		let cartes = ['co','co','cb','cb','sb','sb','so','so','tb','tb','to','to'];
		this.cameras.main.setBackgroundColor(0xD8D4EC);
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var options_data = JSON.parse(json);
		var cards = options_data.cards*2;
		var dificultat = options_data.dificulty;
		var arraycards = cartes.slice(0,cards);
		this.cards = this.physics.add.staticGroup();

		// var e_X = 
		// var e_Y =
        var t_restant = null;
		var punts_perduts = null;

		if(dificultat == "hard"){
			punts_perduts = 20;
			t_restant = 1000;
		}
		else if(dificultat == "normal"){
			punts_perduts = 10;
			t_restant = 2000;
		}
		else{
			punts_perduts = 5;
			t_restant = 3000;
		}








		arraycards.sort((a,b) => 0.5 - Math.random());
		
		for(var k=0; k<cards; k++){

			this.add.image(125*k+50,300,arraycards[k]);
			this.cards.create(125*k+50,300,'back');

		}


		// var quin = 0;
		// for(let i = 0; i < cards; i++){
		// 	for(let j = 0; j<files; j++){
		// 		console.log (cards);
		// 		this.add.image(i*125 + this.cameras.main.centerX - e_x, j*150 + this.cameras.main.centerY - e_y, arraycards[quin]);
		// 		quin +=1;
		// 	}
		// }

		
		let i = 0;
		this.cards.children.iterate((card)=>{
			card.card_id = arraycards[i];
			i++;
			card.setInteractive();
			card.on('pointerup', () => {
				card.disableBody(true,true);
				if (this.firstClick){
					if (this.firstClick.card_id !== card.card_id){
						this.score -= punts_perduts;
						this.firstClick.enableBody(false, 0, 0, true, true);
						var error = [];
						var cont = 0;
						for(let j = 0; j<cards*2; j++){
							let fallada = this.add.image(125*j+50,300,arraycards[cont]);

							error.push(fallada);
							cont++;
						}

						setTimeout(() =>{
							for(let i = 0; i < cards*2; i++){
								error[i].destroy();

							}
						}, t_restant);

						card.enableBody(false, 0, 0, true, true);
						if (this.score <= 0){
							alert("Game Over");
							loadpage("../");
						}
					}
					else{
						this.correct++;
						if (this.correct >= options_data.cards){
							alert("You Win with " + this.score + " points.");
							this.data.set('score',this.score);


							var text = this.add.text(100,100, '', { font: '64px Courier', fill: '#020202'});
							text.setText([
								'Score ' + this.data.get('score')
							])

							var puntuacio = this.data.get('puntuacio');
							var array = []
							array.push(p);

							localStorage.setItem('puntuacion', JSON.stringify(arrayjugadors));
							loadpage("../");
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
	
	update (){	}
}

