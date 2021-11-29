AFRAME.registerComponent("game-play", {
    schema: {
      elementId: { type: "string", default: "#coin1" },      
    },

    init: function(){
      var duration = 90;
      const timerEL = document.querySelector("#timer")

      this.startTimer(duration, timerEL)
    },

    startTimer: function (duration, timerEl) {
      var minutes;
      var seconds;

      setInterval(()=>{
        if (duration >= 0) {
          minutes = parseInt(duration / 60);
          seconds = parseInt(duration % 60);

          if (minutes < 10){
            minutes = "0" + minutes;
          }

          if (seconds < 10) {
            seconds = "0" + seconds;
          }

          timerEl.setAttribute("text", {
            value: minutes + ":" + seconds
          })

          duration -= 1;
        }
        else {
          this.gameOver
        }
      }, 1000)
    },
    
    update: function() {
      this.isCollided(this.data.elementId);
    },
  
    isCollided: function(elementId) {
      const element = document.querySelector(elementId);
      element.addEventListener("collide", (e) => {
        if (elementId.includes("#coin")) {          
          element.setAttribute("visible",false)
          this.updateScore()
          this.updateCoins()
        }
        else{
          this.gameOver()
        }        
      });
    },

    updateScore: function (){
      var element = document.querySelector("#score");
      var count = element.getAttribute("text").value;
      var currentScore = parseInt(count);
      currentScore += 50;
      element.setAttribute("text", {
        value:currentScore
      });
    },

    updateCoins:function(){
      var element=document.querySelector("#coin-count");
      var count= element.getAttribute("text").value;
      var currentCoins= parseInt(count);
      currentCoins -=1
      element.setAttribute("text",{
        value:currentCoins
      })
    },

    

    gameOver:function(){
      var diverEl=document.querySelector("#diver")
      var element=document.querySelector("#game_over_text")
      element.setAttribute("Visible",true)
      diverEl.setAttribute("dynamic-body",{
        mass:1
      })
    }
    
  });
  