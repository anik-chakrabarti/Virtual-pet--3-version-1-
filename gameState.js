class GameState{
    constructor(){
 
        gameStateRef = database.ref('gameState');
    }

    update(state){
       gameStateRef.update({
        gameState: state
       });
    }
    readState(){
        gameStateRef.on('value',function(data){
            gameState = data.val() ; 
           });
    }
}