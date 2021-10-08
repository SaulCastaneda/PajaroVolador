let imagenInicio
let imagenFondo
let imagenPared
let imagenPersonaje
let cancionRecord
let cancionJuego
let estadoJuego = 0
let record = 0
let recordAnterior = 0
let marcador = 0
let x = 0
let py = 50
let dy = 3
let wx = [600,900]
let wy = [400,600]

function preload() {
  imagenInicio = loadImage('./images/fondoinicio.png')
  imagenFondo = loadImage('./images//gotham.jpg')
  imagenPared = loadImage('./images/pared.png')
  cancionRecord = loadSound('./sounds/aplauso.wav')
  cancionJuego = loadSound('./sounds/audioslave.mp3')
}

function setup() {
  // put setup code here
  createCanvas(600,800)
  textSize(40)
}

function draw() {
  if (estadoJuego == 1) { //Jugando
    imageMode(CORNER)
    image(imagenFondo, x, 0)
    image(imagenFondo, x + imagenFondo.width, 0)
    x -= 6 //Desplazamiento a la izquierda de la imagen de fondo
    dy += 1 //Desplazamiento adicional para el personaje
    py = py + dy //Posicion actual del personaje en Y
    if (x < -imagenFondo.width) x = 0

    for (let i = 0; i < wx.length; i++) {
      imageMode(CENTER)
      image(imagenPared, wx[i], wy[i] + (imagenPared.height/2+100))
      image(imagenPared, wx[i], wy[i] - (imagenPared.height/2+100))
      
      if (wx[i] < 0) {
        wx[i] = width
        wy[i] = random(200,height-200)
      }

      if (wx[i] == width/2) {
        marcador++
        record = max(record, marcador)
      }

      if (py > height || py < 0 || (abs(width/2-wx[i]) < 50 && abs(py-wy[i])>100)) {
        estadoJuego = 0
        cancionJuego.stop()
        cursor()
      }
       
      wx[i] -= 6 //Desplazamiento a la izquierda de la imagen de pared
    }

    //Hacemos que el personaje se visualice
    text("🦇", width/2, py)
    //image(imagenPersonaje, width/2, py)
    text("Puntaje: " +marcador, width/2-60,50)

  } else {  // Pantalla de inicio estadoJuego = 0
    fill(0,0,255)
    imageMode(CENTER)
    image(imagenInicio,width/2,height/2)
    text("Record: " + record, 60, 450)
    //Agregar código para aplaudir si se rompe el record
    if (record != recordAnterior) {
      if (!cancionRecord.isPlaying()) {
        cancionRecord.play()
        
      }
      if(record==1){
      text("\nFELICIDADES!!!! VENCISTE\n EL RECORD CON "+record+" PUNTO \n\t Eres Un Campeon@ \n🏆😎🆒",60,90)
      }
        else{
          text("\nFELICIDADES!!! VENCISTE\n EL RECORD CON "+record+ " PUNTOS\n Eres Un Campeon@ \n 🏆😎🆒",60,90)
        }
    }
  }
}

function mousePressed() {
  dy = -15
  if (estadoJuego == 0) {
    estadoJuego = 1
    recordAnterior = record
    marcador = 0
    x = 0
    py = height / 2
    wx = [600,900]
    wy = [400,600]
    noCursor()
    cancionJuego.play()
  }
}

function touchStarted() {
  dy = -15
  if (estadoJuego == 0) {
    estadoJuego = 1
    recordAnterior = record
    marcador = 0
    x = 0
    py = height / 2
    wx = [600,900]
    wy = [400,600]
    cancionJuego.play()
  }

  
}