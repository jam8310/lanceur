//connection serveur
  var socket = io.connect('https://lanceur.herokuapp.com/');


$(function(){

  if(localStorage.nameDes == undefined){
    localStorage.setItem("nameDes", "nom");
    let name = localStorage.getItem('nameDes');
    $('#name').val(name);
  }else{
    let name = localStorage.getItem('nameDes');
    console.log($('#name'));
    $('#name').val(name);
  }



  chargement();
  socket.on('message', function(message) {
    $('#logs').html(message);
    chargement();
  });
  socket.on('clear', function(){
    chargement();
  })


// FONCTION NOMBRE ALEATOIRE
  function aleatoire(min, max){
    return Math.floor(Math.random() * (max - min +1))+ min;
  }

  let dId = 1;
  let dé =1;
  let d4 = [];
  let d6 = [];
  let d8 = [];
  let d10 = [];
  let d12 = [];
  let d20 = [];

  let plateau= [];
  let resLancer = {
    d4 : [],
    d6 : [],
    d8 : [],
    d10 : [],
    d12 : [],
    d20 : []
  };

// BOUTON Dé
  $('.btn').on('click', function(){
    let id = this.id;

    if(id == 4){
      $('.resultat').append(`<li class="${id}"><button type="button" name="${id}" id="${dé}" class="btn_plateau"><img class="img" src="img/d4.png" width="42px" height="42px"/><span>4</span></button></li>`);
      plateau.push(id);
    }
    if(id == 6){
      $('.resultat').append(`<li class="${id}"><button type="button" name="${id}" id="${dé}" class="btn_plateau"><img class="img" src="img/d6.png" width="42px" height="42px"/><span>6</span></button></li>`);
      plateau.push(id);
    }
    if(id == 8){
      $('.resultat').append(`<li class="${id}"><button type="button" name="${id}" id="${dé}" class="btn_plateau"><img class="img" src="img/d8.png" width="42px" height="42px"/><span>8</span></button></li>`);
      plateau.push(id);
    }
    if(id == 10){
      $('.resultat').append(`<li class="${id}"><button type="button" name="${id}" id="${dé}" class="btn_plateau"><img class="img" src="img/d10.png" width="42px" height="42px"/><span>10</span></button></li>`);
      plateau.push(id);
    }
    if(id == 12){
      $('.resultat').append(`<li class="${id}"><button type="button" name="${id}" id="${dé}" class="btn_plateau"><img class="img" src="img/d12.png" width="42px" height="42px"/><span>12</span></button></li>`);
      plateau.push(id);
    }
    if(id == 20){
      $('.resultat').append(`<li class="${id}"><button type="button" name="${id}" id="${dé}" class="btn_plateau"><img class="img" src="img/d20.png" width="42px" height="42px"/><span>20</span></button></li>`);
      plateau.push(id);
    }

    dé++;
    //console.log(plateau);
  });


  // Dé SUR LE PLATEAU
  $('.resultat').on('click',".btn_plateau", function(){
      let id = this.name;
      let del = plateau.indexOf(id);
      let supp = plateau.splice(del,1);

      $(this).parent().remove();
      //console.log(plateau);
    });


  // BOUTON ROLL IT
  $('.btn_roll').on('click', function(){
    if($('.btn_plateau', '.resultat').length == 0){
      alert('Il n\'y a pas de dé sur le plateau !');
    }else{
      let dePlateau = $('.btn_plateau', '.resultat');
      if(dePlateau.hasClass("rotationIn") == false){
        dePlateau.addClass("rotationIn");
        dePlateau.removeClass("rotationOff");
      }else{
        dePlateau.addClass("rotationOff");
        dePlateau.removeClass("rotationIn");
      }

      let resultatD = 0;
      let pseudo = $('#name').val();
      resLancer = {
        pseudo : pseudo,
        total : "",
        d4 : [],
        d6 : [],
        d8 : [],
        d10 : [],
        d12 : [],
        d20 : []
      };


      for(let i = 0; i < plateau.length; i++){
        if(plateau[i] == '4'){
          let res4 = aleatoire(1,4);
          resLancer.d4.push(res4);
          resultatD += parseInt(res4);
        }
        if(plateau[i] == '6'){
          let res6 = aleatoire(1,6);
          resLancer.d6.push(res6);
          resultatD += parseInt(res6);
        }
        if(plateau[i] == '8'){
          let res8 = aleatoire(1,8);
          resLancer.d8.push(res8);
          resultatD += parseInt(res8);
        }
        if(plateau[i] == '10'){
          let res10 = aleatoire(1,10);
          resLancer.d10.push(res10);
          resultatD += parseInt(res10);
        }
        if(plateau[i] == '12'){
          let res12 = aleatoire(1,12);
          resLancer.d12.push(res12);
          resultatD += parseInt(res12);
        }
        if(plateau[i] == '20'){
          let res20 = aleatoire(1,20);
          resLancer.d20.push(res20);
          resultatD += parseInt(res20);
        }
      }
      resLancer.total = resultatD;
      socket.emit('lancer', resLancer);
      chargement();

    }


  });

  //bouton clear
  $('.btn_clear').on('click', function(){
  socket.emit('supprimer');
  });

  $('#name').on('input', function(e){
    e.preventDefault();
    let name = $('#name').val();
    localStorage.setItem("nameDes", name);


  });




function chargement(){



  //lire un fichier JSON
    $.getJSON('https://lanceur.herokuapp.com/variables.json', function(data){

      //objet json dans la variable element
      let element = data;

      //supprimer contenu de la siv
      $('.res').empty();
      let id = element.id -2;


      //Parcourir le document JSON
      for(let i = id; i >= 0; i--){
        //console.log(i);
        const name = element.lancer[i].pseudo;
        const total = element.lancer[i].total;
        let d4 = '';
        let d6 = '';
        let d8 = '';
        let d10 = '';
        let d12 = '';
        let d20 = '';

          if(element.lancer[i].d4 != ''){
            d4 = "<strong>D4:</strong> " + element.lancer[i].d4 + "&nbsp;";
          }
          if(element.lancer[i].d6 != ''){
            d6 = "<strong>D6:</strong> " + element.lancer[i].d6 + "&nbsp;";
          }
          if(element.lancer[i].d8 != ''){
            d8 = "<strong>D8:</strong> " + element.lancer[i].d8 + "&nbsp;";
          }
          if(element.lancer[i].d10 != ''){
            d10 = "<strong>D10:</strong> " + element.lancer[i].d10 + "&nbsp;";
          }
          if(element.lancer[i].d12 != ''){
            d12 = "<strong>D12:</strong> " + element.lancer[i].d12 + "&nbsp;";
          }
          if(element.lancer[i].d20 != ''){
            d20 = "<strong>D20:</strong> " + element.lancer[i].d20 + "&nbsp;";
          }
          let resultat;
          resultat = `
            <div class="resLancerPlateau">
              <ul class="resPlateau">
                <li>${name}</li>
                <li><strong>Total :</strong> ${total} <br> ${d(d4)}  ${d(d6)}  ${d(d8)}  ${d(d10)}  ${d(d12)}  ${d(d20)}  </li>
              </ul>
            </div>
          `;
          //resultat = "<li>" + name + "&nbsp;&nbsp;" + "Total : " + total + "&nbsp;&nbsp;" + d(d4) + ' ' + d(d6) + ' ' + d(d8) + "</li>";
          //console.log(resultat);
          $('.res').append(resultat);
        }

        function d(element){
          if(element != undefined){
            return element;
          }
        }









    });





}






});
