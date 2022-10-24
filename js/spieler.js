class Spieler{
// --Sandro--
  //Eigenschaften eines Spielers: teilweise übernommen von JumpRun
  'use strict';
  breite = 40;          // Breite des Spielers
  hoehe = 40;           // Höhe des Spielers
  posX = 0;             // pos x des Spielers
  posY = 0;             // pos y des Spielers
  geschwindigkeit = 200;// Wie schnell sich der Spieler bewegen kann
//Spielervariablen
  Spieler = undefined;  // Spieler Objekt
  interval = 0;         // Der Zeitraum in dem aktualisiert wird
  animation = 0;        // Den ersten Frame zeichnen lassen
  frame = 0;            // um die Animation zu gewehrleisten den Ausschnitt des Bildes auszuwählen
  stopper = false;      // um die Animation zu stoppen 
  regal = 0;
// Zähler für die Anzeige
  zaehlerGelb = 0;      // Um die Punkte zählen zu können Gelb
  zaehlerGruen = 0;     // Um die Punkte zählen zu können Grün
  zaehlerBlau = 0;      // Um die Punkte zählen zu können Blau
  zaehlerRot = 0;       // Um die Punkte zählen zu können Rot
// Punkteüberprüfung damit nur 1 Paket aufgenommen werden kann
  punkteGelb = false;       // Um zu überprüfen ob ein Paket eingesammelt wurde Gelb
  punkteGruen = false;      // Um zu überprüfen ob ein Paket eingesammelt wurde Grün  
  punkteBlau = false;       // Um zu überprüfen ob ein Paket eingesammelt wurde Blau
  punkteRot = false;        // Um zu überprüfen ob ein Paket eingesammelt wurde Rot
  bananeMuellColect = false;                            
  MuellColect = false;
//Verlinkung der div tags im Html für die Punkteanzeige Rechts
  PunkteGe = document.getElementById('PunkteGelb');//PunkteGe Erstellen für Punktespeicherung der Gelben punkte
  PunkteGr = document.getElementById('PunkteGruen');
  PunkteBl = document.getElementById('PunkteBlau');
  PunkteRo = document.getElementById('PunkteRot');
//Sound Inplementierung
  zielsound = new Audio('./audio/success.mp3');        //Soundeinbindung für das Ziel
  zielsoundFalsch = new Audio('./audio/error.mp3');    //Soundeinbindung für das falsche Paket
  collectsound = new Audio('./audio/collect.mp3');     //Soundeinbindung für das Einsammeln der Pakete
  victorysound = new Audio('./audio/victory.mp3');     //Soundeinbindung für den Sieg
  defeatsound = new Audio('./audio/death.mp3');        //Soundeinbindung für die Niederlage
  muellsound = new Audio('./audio/muell.mp3');
  audioswitch = 'an';       //um die Stummschaltung des Sounds zu übertragen
  audioEnde = false;        // damit der Ton nicht dauernd wiederholt wird
//Ziel
  spielfelZiel = document.getElementById('Spielfeld');
  anzeigeZiel = document.getElementById('Anzeige');
  victoryanzeigen = document.getElementById('victory');
  zielGelb = document.getElementById('victoryGelb');
  zielGruen = document.getElementById('victoryGruen');
  zielBlau = document.getElementById('victoryBlau');
  zielRot = document.getElementById('victoryRot');
//Quest
  anzeigeQuest = document.getElementById('anzeigeQuest');
  q = 0;                                          // Aktuelle Quest, die ausgeführt wird
  newQuest = 0;                                   // Neu erzeugte Quest
  questZiel = new Array(this.punkteGelb,this.punkteGruen,this.punkteBlau,this.punkteRot);
  questVorher = -1;                               //Startet bei -1, weil als erste Quest nie die Gelbe Kiste kam weil wenn es 0 gewürfelt hat wurde erneut gewürfelt
  questNacher = 0;                                //Um die Quest neu zu würfeln
  aufgabenFortschritt = 0;                        //Wie viele Quests schon erledigt wurden
  aufgabenAnzahl = 4;                             //wie viele Quests erledigt werden können bevor Ende
//Lebensanzeige Verlinkung
  lebenAnzahl = document.getElementById('leben'); //Variable, dass man später die Leben zählen kann
  leben = 1;                                      //Inplementierung der Leben, die später auf Anzahl Leben gesetzt wird 
  leben1 = document.getElementById('leben1');     //Die Leben werden von 1 bis zu 6 abgerufen, sodass sie später ausgeblendet werden können
  leben2 = document.getElementById('leben2');
  leben3 = document.getElementById('leben3');
  leben4 = document.getElementById('leben4');
  leben5 = document.getElementById('leben5');
  leben6 = document.getElementById('leben6');
//Game Over Verlinkung
spielGameOver = document.getElementById('defeat'); //Das Niederlagen Display wird verlinkt
// --Sandro--
//Beginn Programmierung-------------------------------------------------------------------------------------------------------------------------------
//Konstruktor Methode zur Erzeugung neuer Instanzen:-----teilweise übernommen von JumpRun-------
  constructor(startX,startY,questCounter){
    //Startpositionen x und y auf der Karte, diese werden auch übergeben
      this.posX = startX;   
      this.posY = startY; 
    //Spieler Spritesheet wird eingebunden, sodass er später angezeigt werden kann
      this.Spieler = document.getElementById('Robo');  
    //Die Methode Quest wird aufgerufen und es wird dadurch die erste Quest beim Spielstart generiert
      this.quest();
    //Lebensumwandlung, es wird gezählt wie viele Bilder in dem div Tag liegen und diese Zahl wird für Leben eingesetzt
      this.leben = Math.floor(this.lebenAnzahl.childNodes.length/2);
    //Damit die Anzahl von Quests für jedes Dokument einzeln eingestellt werden kann
      this.aufgabenAnzahl = questCounter;  
  }
  //Seite wird aktualisiert-----Übernommen von JumpRun--------------------------------------------------------------------------------------------------
// --Sandro--
  //Function aktualisieren 
  //Die Funktionen wo hier drinstehen werden immer wieder aufgerufen und überprüft z.B wird überprüft, ob der Spieler sich auf dem angegebenen Punkten befindet. 
aktualisieren(dauer){
  this.bewegen(dauer);    // damit der Spieler sich bewegen kann
  this.animieren(dauer);  // Für die Animation des Spielers
  this.sammelnGruen('g'); // Damit das Grüne Paket eingesammelt werden kann
  this.sammelnBlau('B');  // Damit das Blaue Paket eingesammelt werden kann
  this.sammelnGelb('G');  // Damit das Gelbe Paket eingesammelt werden kann 
  this.sammelnRot('R');   // Damit das Rote Paket eingesammelt werden kann
  this.sammelnRegal('X'); // Damit das falsche Regal / das Kaputte Regal eingesammelt werden kann
  this.ziel('Z');         // Damit das Ziel überprüft werden kann
  this.eimer('m');        // Damit der Müll abgegeben werden kann
  this.muell('j');        // Der Müll
  this.banane('i');       // Die Banane
  this.anzeigen();        // Damit alles neu gezeichnet wird
}
//Quest--------------------------------------------------------------------------------------------------------------------- 
// --Sandro--
//hier werden die verschiedenen Quests erstellt, die erste beim Starten des Spiels in dem Constructor
quest(){
  this.newQuest = Math.floor(Math.random(0)*4);   // Es wird eine ZZ zwischen 0 und 3 generiert, damit es 4 Möglichkeiten gibt die auftreten können für die 4 Farben der Pakete
  this.questNacher = this.newQuest;               // Hier wird die neue Quest gespeichert damit bei einer gleichen Quest, diese neu ausgewürfelt werden kann
  if(this.questVorher == this.questNacher){       // Wenn die Quest vorher gleich der Quest nacher ist dann:
    this.newQuest = Math.floor(Math.random(0)*4); // Wird neu gewürfelt
    this.questVorher = this.questNacher;          // Wird die Quest vorher auf den neuen alten Wert gesetzt
    this.quest();                                 // die Funktion wird erneut aufgerufen
  }else{                        
    this.questVorher = this.questNacher;          // Wenn die neue Quest auf die alte übertragen wird, sodass sie beim nächsten Mal wieder überprüft werden kann
    this.q = this.newQuest;                       // Die aktuelle Quest wird durch die neue ersetzt
    this.questZiel[this.q];                       // Hier wird die Stelle des Arrays ausgewählt, um die neue Quest anzeigen zu können
    //console.log(this.q);
  }
  switch (this.q) {                               //Hier werden die verschiedenen Quests je nach Stelle im Array oben im Bildschirm angezeigt
    case 0:
        this.anzeigeQuest.innerText = "Sammle ein gelbes Paket ein";  //QuestAnzeige wird auf den Text geändert
      break;
    case 1:
        this.anzeigeQuest.innerText = "Sammle ein grünes Paket ein";
      break;
    case 2:
        this.anzeigeQuest.innerText = "Sammle ein blaues Paket ein";
      break;
    case 3:
        this.anzeigeQuest.innerText = "Sammle ein rotes Paket ein";
      break;
    default:
        this.anzeigeQuest.innerText = "Fehler bitte Spiel Neu Starten"; // falls ein Fehler auftreten sollte
      break;
  }
}
//Ende / Game Over Screen -------------------------------------------------------------------------------------------------------------------------------------------------
// --Sandro--
//wird ausgelöst wenn der Spieler keine Leben mehr hat
gameOver(){
  if (this.audioswitch == localStorage.getItem('audioswitch')){//damit mit dem sound switch der sound an und aus geschaltet werden kann
    this.defeatsound.play();               // Sound Abspielen
  }
  this.anzeigeZiel.style.display = 'none';        // Punkteanzeige ausblenden
  this.spielfelZiel.style.display = 'none';       // Spielfeld ausblenden
  window.removeEventListener('keydown',steuern);  // damit nicht im Hintergrund weiter gespielt werden kann
  window.removeEventListener('keyup',steuern);    // damit nicht im Hintergrund weiter gespielt werden kann
  this.spielGameOver.style.display = "block";     // Der Game Over Bildschirm wird eingeblendet
}
//Ende Victory screen ---------------------------------------------------------------------------------------------------------------------------------------------------
// --Sandro--
// Es wird ausgeführt, wenn alle Missionen erfolgreich abgeschlossen wurden und man mindestens 1 Leben hat
victory(){
  this.leben = 3;                                 // Damit der Sound zurückgesetzt wird und nicht bei einem Leben die ganze Zeit sich der Sound loopt
  this.anzeigeZiel.style.display = 'none';        // Punkteanzeige ausblenden
  this.spielfelZiel.style.display = 'none';       // Spielfeld ausblenden
  window.removeEventListener('keydown',steuern);  // damit nicht im Hintergrund weiter gespielt werden kann
  window.removeEventListener('keyup',steuern);    // damit nicht im Hintergrund weiter gespielt werden kann
  this.victoryanzeigen.style.display = 'block';   // Victory screen wird eingeblendet
  if (this.audioswitch == localStorage.getItem('audioswitch')){
    this.victorysound.play();                     // Victory Sound wird ausgegeben
  }
//Punktevergabe Gelb
// Auflistung der Punkteanzahl und Ausgabe der Punkte bei Sieg
  if(this.zaehlerGelb == 0){
    this.zielGelb.innerText = 'Sie Haben '+this.zaehlerGelb+' gelbe Paket gesammelt';     //Wird eingesetzt bei 0 Paketen
  }else{
    if(this.zaehlerGelb ==1){
      this.zielGelb.innerText = 'Sie Haben '+this.zaehlerGelb+' gelbes Paket gesammelt';  //Wird eingesetzt bei 1 gesammelten Paket
    }else{
      this.zielGelb.innerText = 'Sie Haben '+this.zaehlerGelb+' gelbe Pakete gesammelt';  //Wird eingesetzt bei mehr als 1 Paket
    }
  }
//Punktevergabe Grün
  if(this.zaehlerGruen == 0){
    this.zielGruen.innerText = 'Sie Haben '+this.zaehlerGruen+' grüne Paket gesammelt';
  }else{
    if(this.zaehlerGruen ==1){
      this.zielGruen.innerText = 'Sie Haben '+this.zaehlerGruen+' grünes Paket gesammelt';
    }else{
      this.zielGruen.innerText = 'Sie Haben '+this.zaehlerGruen+' grüne Pakete gesammelt';
    }
  }
//Punktevergabe Blau
  if(this.zaehlerBlau == 0){
    this.zielBlau.innerText = 'Sie Haben '+this.zaehlerBlau+' blaue Paket gesammelt';
  }else{
    if(this.zaehlerBlau ==1){
      this.zielBlau.innerText = 'Sie Haben '+this.zaehlerBlau+' blaues Paket gesammelt';
    }else{
      this.zielBlau.innerText = 'Sie Haben '+this.zaehlerBlau+' blaue Pakete gesammelt';
    }  
  }
//Punktevergabe Rot
  if(this.zaehlerRot == 0){
    this.zielRot.innerText = 'Sie Haben '+this.zaehlerRot+' rote Pakete gesammelt';
  }else{
    if(this.zaehlerRot ==1){
      this.zielRot.innerText = 'Sie Haben '+this.zaehlerRot+' rotes Paket gesammelt';
    }else{
      this.zielRot.innerText = 'Sie Haben '+this.zaehlerRot+' rote Pakete gesammelt';
    }
  }
}
//Überprüfung Punkte ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------  
//--Sandro--
//Zielüberprüfung///////////////////////////////////////////////////////////////////////////////
//Hier werden die Punkte gezählt / die Quest erneuert / und über Sieg und Niederlage entschieden, je nachdem werden Leben Abgezogen oder Punkte gegeben  
ziel(item){                                                     //Wenn die Position des Spielers mit dem Buchstaben für das Ziel übereinstimt 
  let spalte = Math.floor((this.posX + this.breite*0.5)/FELD);  //
  let zeile = Math.floor((this.posY + this.hoehe*0.7)/FELD);
  if(this.leben > 0){
    if (((this.punkteGelb == true)||(this.punkteGruen == true)||(this.punkteBlau ==true)||(this.punkteRot ==true)) && map[zeile].charAt(spalte) == item && (this.aufgabenFortschritt != this.aufgabenAnzahl)) { // es wid überprüft ob irgendwo der punkt auf 1 gestiegen ist und somit dann überprüft ob es gesucht wird
        BLOCKER = 'WSn';
        if (this.punkteGelb == true ) {
          //console.log('Punkte Gelb : '+this.punkteGelb);//die Punkte werden in die Konsole geschrieben
          if (this.q == 0){
            this.aufgabenFortschritt++
            this.zaehlerGelb++
            this.PunkteGe.innerText = this.zaehlerGelb;
            this.punkteGelb = false;
            if (this.audioswitch == localStorage.getItem('audioswitch')){
              this.zielsound.play();
            }
            this.quest();
          }else{
            if (this.audioswitch == localStorage.getItem('audioswitch')){
              this.zielsoundFalsch.play();
            }
            console.log('Falsch Gelb');
            this.punkteGelb = false;
            this.leben--
          }
        }
        if (this.punkteGruen == 1) {
          //console.log('Punkte Grün : '+this.punkteGruen);
          if (this.q == 1){
            this.aufgabenFortschritt++
            this.zaehlerGruen++;
            this.PunkteGr.innerText = this.zaehlerGruen;
            this.punkteGruen = false;
            if (this.audioswitch == localStorage.getItem('audioswitch')){
              this.zielsound.play();
            }
            this.quest();
          }else{
            if (this.audioswitch == localStorage.getItem('audioswitch')){
              this.zielsoundFalsch.play();
            }
            console.log('Falsch Grün');
            this.punkteGruen = false;
            this.leben--
          }
        } 
        if (this.punkteBlau ==1) {
          //console.log('Punkte Blau : '+this.punkteBlau);
          if(this.q == 2){
            this.aufgabenFortschritt++
            this.zaehlerBlau++;
            this.PunkteBl.innerText = this.zaehlerBlau;
            this.punkteBlau = false;
            if (this.audioswitch == localStorage.getItem('audioswitch')){
              this.zielsound.play();
            }
            this.quest();
          }else{
            if (this.audioswitch == localStorage.getItem('audioswitch')){
              this.zielsoundFalsch.play();
            }
            console.log('Falsch Blau');
            this.punkteBlau = false;
            this.leben--
          }
        } 
        if (this.punkteRot ==1) {
          //console.log('Punkte Rot : '+this.punkteRot);
          if(this.q == 3){
            this.aufgabenFortschritt++
            this.zaehlerRot++
            this.PunkteRo.innerText = this.zaehlerRot;
            this.punkteRot = false;
            if (this.audioswitch == localStorage.getItem('audioswitch')){
              this.zielsound.play();
            } 
            this.quest();
          }else{
            if (this.audioswitch == localStorage.getItem('audioswitch')){
              this.zielsoundFalsch.play();
            }
            console.log('Falsch Rot');
            this.punkteRot = false; 
            this.leben--
          }
        }
      this.stopper = false;
    }
    if(this.aufgabenFortschritt == this.aufgabenAnzahl ){
      if(this.audioEnde == false){
        this.victory();
        this.audioEnde = true;
      }  
    }
  }
//Darstellung der Leben und Aktivierung des Game Over
  if (this.leben == 5 && this.leben6) {
    this.leben6.style.display = 'none';
  } else {
    if (this.leben == 4 && this.leben5) {
      this.leben5.style.display = 'none';
    } else {
      if (this.leben == 3 && this.leben4 ) {
        this.leben4.style.display = 'none';
      } else {
        if(this.leben == 2 && this.leben3){
          this.leben3.style.display = 'none';
        }else{
          if(this.leben == 1 && this.leben2){
            this.leben2.style.display = 'none';
            if (this.audioswitch == localStorage.getItem('audioswitch')){
              this.zielsoundFalsch.play();
            }
          }else{
            if(this.leben == 0){
              this.leben1.style.display = 'none';
              this.gameOver();
            }
          }
        }
      }
    }
  }
}
//--Sandro--
// Für das Objekt Mülleimer
eimer(item){
  let spalte = Math.floor((this.posX + this.breite*0.5)/FELD);
  let zeile = Math.floor((this.posY + this.hoehe*0.7)/FELD);
  
  if((map[zeile].charAt(spalte) == item) && (this.MuellColect == true||this.bananeMuellColect == true)){
    if(this.MuellColect == true){
      this.MuellColect = false;
      this.victory();
    }
    if(this.bananeMuellColect == true)
      if (this.audioswitch == localStorage.getItem('audioswitch')){
        this.muellsound.play();
      }
      this.bananeMuellColect = false;
      BLOCKER = 'WSn';
      this.stopper = false ;
  }
}
//--Sandro--
// Für den Müll/ Die Person mit der Glatze
muell(item){
  let spalte = Math.floor((this.posX + this.breite*0.5)/FELD);
  let zeile = Math.floor((this.posY + this.hoehe*0.7)/FELD);
  if(map[zeile].charAt(spalte) == item){
    if (this.audioswitch == localStorage.getItem('audioswitch')){
      this.collectsound.play();
    }
    this.MuellColect = true;
    BLOCKER = 'WSGgBRij';
    let davor = map[zeile].substring(0,spalte);   // eine Zeile davor wird ausgewählt
    let danach = map[zeile].substring(spalte+1);  // eine Zeile danach wird ausgewählt
    map[zeile]= davor +' '+ danach;// in die entfernte Zeile wird in dem Fall das D eingefügt
    //console.log(this.regal);                             
    level = zeichneLevel(map);       // Level wird neu gezeichnet
  }
}
banane(item){
  let spalte = Math.floor((this.posX + this.breite*0.5)/FELD);
  let zeile = Math.floor((this.posY + this.hoehe*0.7)/FELD);
  if(((this.punkteGelb == false)&&(this.punkteGruen == false)&&(this.punkteBlau == false)&&(this.punkteRot == false)&&(this.bananeMuellColect == false)&&(this.MuellColect == false)) && map[zeile].charAt(spalte) == item){//falls Item Buchstabe im aktuellen feld steht 
    if (this.audioswitch == localStorage.getItem('audioswitch')){
      this.collectsound.play();
    }
      this.bananeMuellColect = true;                // Angabe, dass Banane aufgenommen wurde
      BLOCKER = 'WSGgBRij';                         // Blocker wird gesetzt
      let davor = map[zeile].substring(0,spalte);   // eine Zeile davor wird ausgewählt
      let danach = map[zeile].substring(spalte+1);  // eine Zeile danach wird ausgewählt
      map[zeile]= davor +' '+ danach;                            
      level = zeichneLevel(map);       // Level wird neu gezeichnet
  }
}
//--Sandro--
//Methode Sammeln Gelb--Übernommen von JumpRun------------------------------------------------------------------------------------------------    
sammelnGelb(item){
    let spalte = Math.floor((this.posX + this.breite*0.5)/FELD);
    let zeile = Math.floor((this.posY + this.hoehe*0.7)/FELD);
    if(((this.punkteGelb == false)&&(this.punkteGruen == false)&&(this.punkteBlau == false)&&(this.punkteRot == false)) && map[zeile].charAt(spalte) == item){//falls Item Buchstabe im aktuellen feld steht
      if (this.audioswitch == localStorage.getItem('audioswitch')){
        this.collectsound.play();
      }
        this.punkteGelb = true;
        //console.log(this.punkteGelb);                // nur zum überprüfen
        BLOCKER = 'WSGgBRij';
        let davor = map[zeile].substring(0,spalte);   // eine Zeile davor wird ausgewählt
        let danach = map[zeile].substring(spalte+1);  // eine Zeile danach wird ausgewählt
        map[zeile]= davor +'S'+ danach;// in die entfernte Zeile wird in dem Fall das D eingefügt
        //console.log(this.regal);                             
        level = zeichneLevel(map);       // Level wird neu gezeichnet
    }
}
//Methode Sammeln Gruen---------------------------------------------------------------------------------------------------------------    
sammelnGruen(item){
  let spalte = Math.floor((this.posX + this.breite*0.5)/FELD);
  let zeile = Math.floor((this.posY + this.hoehe*0.7)/FELD);
  if(((this.punkteGelb == false)&&(this.punkteGruen == false)&&(this.punkteBlau == false)&&(this.punkteRot == false)) && map[zeile].charAt(spalte) == item){//falls Item Buchstabe im aktuellen feld steht
    if (this.audioswitch == localStorage.getItem('audioswitch')){
      this.collectsound.play();
    }
      this.punkteGruen = true;
      //console.log(this.punkteGruen);
      BLOCKER = 'WSGgBRij';
      let davor = map[zeile].substring(0,spalte);
      let danach = map[zeile].substring(spalte+1);
      map[zeile]= davor +'S'+ danach;// in die entfernte Zeile wird in dem Fall das D eingefügt
      level = zeichneLevel(map);
  }
}
//Methode Sammeln Gelb---------------------------------------------------------------------------------------------------------------    
sammelnBlau(item){
  let spalte = Math.floor((this.posX + this.breite*0.5)/FELD);
  let zeile = Math.floor((this.posY + this.hoehe*0.7)/FELD);
  if(((this.punkteGelb == false)&&(this.punkteGruen == false)&&(this.punkteBlau == false)&&(this.punkteRot == false)) && map[zeile].charAt(spalte) == item){//falls Item Buchstabe im aktuellen feld steht
    if (this.audioswitch == localStorage.getItem('audioswitch')){
      this.collectsound.play();
    }
      this.punkteBlau = true;
      //console.log(this.punkteBlau);
      BLOCKER = 'WSGgBRij';
      let davor = map[zeile].substring(0,spalte);
      let danach = map[zeile].substring(spalte+1);
      map[zeile]= davor +'S'+ danach;// in die entfernte Zeile wird in dem Fall das D eingefüg
      level = zeichneLevel(map);
  }
}
//Methode Sammeln Gelb---------------------------------------------------------------------------------------------------------------    
sammelnRot(item){
  let spalte = Math.floor((this.posX + this.breite*0.5)/FELD);
  let zeile = Math.floor((this.posY + this.hoehe*0.7)/FELD);
  if(((this.punkteGelb == false)&&(this.punkteGruen == false)&&(this.punkteBlau == false)&&(this.punkteRot == false)) && map[zeile].charAt(spalte) == item){//falls Item Buchstabe im aktuellen feld steht
    if (this.audioswitch == localStorage.getItem('audioswitch')){
      this.collectsound.play();
    }
      this.punkteRot = true;
      BLOCKER = 'WSGgBRij';
      let davor = map[zeile].substring(0,spalte);
      let danach = map[zeile].substring(spalte+1);
      map[zeile]= davor +'S'+ danach;// in die entfernte Zeile wird in dem Fall das D eingefügt
      level = zeichneLevel(map);
  }
}
//Methode, um das kaputte Regal einsammeln zu können
sammelnRegal(item){
  let spalte = Math.floor((this.posX + this.breite*0.5)/FELD);
  let zeile = Math.floor((this.posY + this.hoehe*0.7)/FELD);
  if (map[zeile].charAt(spalte) == item) {
    let davor = map[zeile].substring(0,spalte);
    let danach = map[zeile].substring(spalte+1);
    map[zeile]= davor +' '+ danach;
    this.geschwindigkeit = 50;
    level = zeichneLevel(map);
    setTimeout(resetSpeed,5000);
  }
}
//Methode Blockade ----Übernommen von JumpRun----------------------------------------------------------------------------------------------------------
blockade(pixelX,pixelY, map){
    let b = {};//b = blockiert
    b.spalteLinks = Math.floor(pixelX/FELD);
    b.spalteRechts = Math.floor((pixelX+this.breite-1)/FELD);
    b.zeileOben = Math.floor(pixelY/FELD);
    b.zeileUnten = Math.floor((pixelY+this.hoehe-1)/FELD);
    b.links = (BLOCKER.indexOf(map[b.zeileOben].charAt(b.spalteLinks))>=0) ||
              (BLOCKER.indexOf(map[b.zeileUnten].charAt(b.spalteLinks))>=0);
    b.rechts =(BLOCKER.indexOf(map[b.zeileOben].charAt(b.spalteRechts))>=0) ||
              (BLOCKER.indexOf(map[b.zeileUnten].charAt(b.spalteRechts))>=0);
    b.oben = (BLOCKER.indexOf(map[b.zeileOben].charAt(b.spalteLinks))>=0) ||
              (BLOCKER.indexOf(map[b.zeileOben].charAt(b.spalteRechts))>=0);        
    b.unten = (BLOCKER.indexOf(map[b.zeileUnten].charAt(b.spalteLinks))>=0) ||
              (BLOCKER.indexOf(map[b.zeileUnten].charAt(b.spalteRechts))>=0);
    return b;
}
//--Sandro--
//Methode bewegen----------------------------------------------------------------------------------------------------------------
//um die Steuerung zu ermöglichen Mit W A S D und den Pfeiltasten sowie langsamer mit shift und schneller mit Leertaste
bewegen(dauer){
//blockieren links :Übernommen von JumpRun
    if(steuerung.links) {
      this.posX -= this.geschwindigkeit*dauer;
      let blockiert = this.blockade(this.posX, this.posY, map); 
      if(blockiert.links){
          this.posX = (FELD * blockiert.spalteLinks+FELD);
      }
    }
//blockieren rechts :Übernommen von JumpRun
    if(steuerung.rechts) {
      this.posX += this.geschwindigkeit*dauer; 
      let blockiert = this.blockade(this.posX, this.posY, map);
      if(blockiert.rechts){
          this.posX = FELD * blockiert.spalteRechts- this.breite ;
      }
    }
//blockade oben
  if(steuerung.oben){
    this.posY -= this.geschwindigkeit*dauer;
    let blockiert = this.blockade(this.posX, this.posY, map)
    if(blockiert.oben){
      this.posY = FELD * blockiert.zeileOben +FELD;
    }
  }
//blockieren unten  
  if(steuerung.unten){
    this.posY += this.geschwindigkeit*dauer;
    let blockiert = this.blockade(this.posX, this.posY, map)
    if(blockiert.unten){
      this.posY = FELD * blockiert.zeileUnten -this.breite;
    }
  }
}
//--Sandro--
//Animation----teilweise Übernommen von JumpRun------------------------------------------------------------------------------------------------------------------
animieren(dauer){
  this.interval += dauer;// Zeit seit dem letzten Wechsel in Sekunden
  if(this.interval > 0.05){// Mehr als 1/20 Sekunde vergangen
    this.interval = 0;
    if (this.stopper == false) {
      if ((this.punkteGelb && this.punkteGruen && this.punkteBlau && this.punkteRot && this.bananeMuellColect)== false) {// wenn kein Paket Aufgenummen ist wird das hier ausgeführt
        this.frame = 0;//frame zurücksetzen für startbild 
      }
// Animation Kiste Spieler Gelb
      if(this.punkteGelb == true){
        this.frame = (++this.frame);// es wird 1 Bild weiter gesprungen auf Gelb
        this.stopper = true;
      }
// Animation Kiste Spieler Grün
      if (this.punkteGruen ==true) {
        this.frame = (++this.frame )*2;//es wird 2 Bilder weiter gesprungen auf Gruen
        this.stopper = true;
      }
// Animation Kiste Spieler Blau
      if (this.punkteBlau == true) {
        this.frame = (++this.frame)*3;
        this.stopper = true;  
      }
// Animation Kiste Spieler Rot
      if (this.punkteRot == true) {
        this.frame = (++this.frame)*4;
        this.stopper = true;  
      }
// Animation Banane 
      if(this.bananeMuellColect == true){
        this.frame = (++this.frame)*5;
        this.stopper = true;
      }
// Animation Müll 
      if(this.MuellColect == true){
        this.frame = (++this.frame)*6;
        this.stopper = true;
      }
    }  
  }
}
//Anzeige----Übernommen von JumpRun--------------------------------------------------------------------------------------------------------------------
anzeigen(){
  let stift=level.getContext('2d');
  //Nimm aus der LVL Graphik einen Bereich von der Ausschnittsbreite um die Spielposition herum
  let ausschnittX = this.posX + this.breite/2 - ausschnitt.width/2;
  let bereich = stift.getImageData(ausschnittX,0,ausschnitt.width,ausschnitt.height);
  stift = ausschnitt.getContext('2d');
  stift.putImageData(bereich,0,0);
  //Anzeigen des Spielers
  stift = ausschnitt.getContext('2d');
  //stift.strokeStyle = "#ffffff";
  //stift.strokeRect(ausschnitt.width/2 - this.breite/2, this.posY, this.breite, this.hoehe);
  stift.drawImage(this.Spieler,(this.frame*this.breite),(this.animation*this.hoehe), 
                                  this.breite, this.hoehe, 
                                  ausschnitt.width/2 - this.breite /2, 
                                  this.posY, this.breite, this.hoehe);
  }
}