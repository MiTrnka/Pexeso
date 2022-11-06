'use strict';
//Pexeso
var novaHra;

function klik (poradi) {
    novaHra.Hraj(poradi);
}

class Karta {
    constructor (poradi,nazev) {
        this.poradi=poradi;
        this.nazev=nazev;
        this.otocena=false;
        this.sebrana=false;
    }
}

class Players {
    constructor (name1, name2) {
        this.name1=name1;
        this.number1=0;
        this.name2=name2;
        this.number2=0;
        this.text1 = document.getElementById("player1");
        this.text2 = document.getElementById("player2");
        this.jePrvniHracNaRade = true;
    }
    vypis() {
        if (this.jePrvniHracNaRade) {
            this.text1.style="color: red; font-size: x-large;";
            this.text2.style="color: black font-size: medium;";
        }
        else {
            this.text1.style="color: black font-size: medium;";
            this.text2.style="color: red; font-size: x-large;";
        }
        this.text1.innerText=this.name1+": "+this.number1;
        this.text2.innerText=this.name2+": "+this.number2;
    }
}

class Stul {
    constructor () {
        this.karty = [];
        let obj;
        for (let i=0;i<36;i++) {
            this.karty[i]=new Karta(i,"O"+Math.floor(i/2)+".png");
            obj=document.getElementById("o"+i);
            obj.src="O.png";
        }
        this.zamichej();
    }
    zamichej () {
        let pomocnaKarta,k1,k2;
        for (let i=0;i<100;i++) {
            k1=Math.floor(Math.random()*35);
            k2=Math.floor(Math.random()*35);
            pomocnaKarta=this.karty[k1];
            this.karty[k1]=this.karty[k2];
            this.karty[k2]=pomocnaKarta;
            this.karty[k1].otocena=false;
            this.karty[k1].sebrana=false;
            this.karty[k2].otocena=false;
            this.karty[k2].sebrana=false;
        }
    }
    otocKartu (poradi) {
        let obj=document.getElementById("o"+poradi);
        if (this.karty[poradi].otocena) {
            this.karty[poradi].otocena=false;
            obj.src="O.png";
        }
        else {
            this.karty[poradi].otocena=true;
            obj.src=this.karty[poradi].nazev;
        }
        
    }
}

class Hra {
    constructor () {
        this.players = new Players(prompt("Zadejte jméno prvního hráče."),prompt("Zadejte jméno druhého hráče."));
        if ((this.players.name1==null)||(this.players.name1.trim()==""))
            this.players.name1="Hráč 1";
            var s="s";
        if ((this.players.name2==null)||(this.players.name2.trim()==""))
            this.players.name2="Hráč 2";
        this.stul = new Stul();
        this.players.vypis();
        this.zacatek = true;
        this.poradiPredchoziKarty = 0;
    }
    ZahajNovouHru() {
        this.players.jePrvniHracNaRade=true;
        this.players.number1=0;
        this.players.number2=0;
        this.stul = new Stul();
        this.players.vypis();
        this.zacatek = true;
        this.poradiPredchoziKarty = 0;
    }
    Hraj (poradi) {
        if (!this.stul.karty[poradi].sebrana)
        {
            if (!this.stul.karty[poradi].otocena) {
                this.stul.otocKartu(poradi);
                if (this.zacatek) {
                    this.zacatek=!this.zacatek;
                    this.poradiPredchoziKarty=poradi;
                } else {
                    this.zacatek=!this.zacatek;
                    if (this.stul.karty[poradi].nazev==this.stul.karty[this.poradiPredchoziKarty].nazev) {                        
                        if (this.players.jePrvniHracNaRade) {
                            this.players.number1+=1;
                        } else {
                            this.players.number2+=1;
                        }
                        this.players.vypis();                        
                        if (this.players.number1>=9) {
                            this.players.vypis();
                            alert("Gratuluji k vítěztví! Vyhrál hráč: "+this.players.name1+". Počet bodů: "+this.players.number1);
                            this.ZahajNovouHru();
                        }
                        if (this.players.number2>=9) {
                            this.players.vypis();
                            alert("Gratuluji k vítěztví! Vyhrál hráč: "+this.players.name2+". Počet bodů: "+this.players.number2);
                            this.ZahajNovouHru();
                        }
                    }
                    else {                        
                        this.players.jePrvniHracNaRade = !this.players.jePrvniHracNaRade;
                        p1=this.poradiPredchoziKarty;
                        p2=poradi;
                        setTimeout(otocZpetKarty,800);
                    }
                }
                
            }
        } else {
            alert("Karta již byla použita.");
        }

    }
}
var p1, p2;
function otocZpetKarty() {
    novaHra.stul.otocKartu(p1);
    novaHra.stul.otocKartu(p2);
    novaHra.players.vypis();
}

window.onload = function() {
    novaHra = new Hra();
}