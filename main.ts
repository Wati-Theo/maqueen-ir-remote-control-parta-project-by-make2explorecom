IR.IR_init()
let instructionSequence: string[] = []
let isExecutingSequence = false
let lastIrTime = 0
let debounceDelay = 50 // Délai en nombre d'itérations entre les lectures IR

let currentTime = 0

basic.forever(function () {
    currentTime += 1
    if (!isExecutingSequence) {
        let irData = IR.IR_read()
        if (irData != -1 && (currentTime - lastIrTime) > debounceDelay) {
            lastIrTime = currentTime
            if (irData == 249) {
                basic.showArrow(ArrowNames.North)
                instructionSequence.push("forward")
            } else if (irData == 89) {
                basic.showArrow(ArrowNames.West)
                instructionSequence.push("left")
            } else if (irData == 185) {
                basic.showArrow(ArrowNames.East)
                instructionSequence.push("right")
            } else if (irData == 121) {
                basic.showArrow(ArrowNames.South)
                instructionSequence.push("backward")
            } else if (irData == 233) {
                // Commencer l'exécution de la séquence
                isExecutingSequence = true
                executeSequence()
            }
            basic.pause(500)
            basic.clearScreen()
        }
    }
})

function executeSequence() {
    for (let instruction of instructionSequence) {
        if (instruction == "forward") {
            basic.showArrow(ArrowNames.North)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CW, 50)
            basic.pause(800) // Ajustez cette valeur pour avancer de 10 cm
        } else if (instruction == "left") {
            basic.showArrow(ArrowNames.West)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CW, 50)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CCW, 50)
            basic.pause(350) // Ajustez cette valeur pour tourner à gauche de 90°
        } else if (instruction == "right") {
            basic.showArrow(ArrowNames.East)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M1, Maqueen_V5.Dir.CCW, 50)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.M2, Maqueen_V5.Dir.CW, 50)
            basic.pause(350) // Ajustez cette valeur pour tourner à droite de 90°
        } else if (instruction == "backward") {
            basic.showArrow(ArrowNames.South)
            Maqueen_V5.motorRun(Maqueen_V5.Motors.All, Maqueen_V5.Dir.CCW, 50)
            basic.pause(800) // Ajustez cette valeur pour reculer de 10 cm
        }
        Maqueen_V5.motorStop(Maqueen_V5.Motors.All)
        basic.pause(500)
        basic.clearScreen()
    }
    instructionSequence = [] // Réinitialiser la séquence après exécution
    isExecutingSequence = false // Permettre au système de recevoir de nouvelles instructions
    lastIrTime = 0 // Réinitialiser le temps pour permettre de nouvelles entrées
}
