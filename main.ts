IR.IR_init()
let instructionSequence: string[] = []
let prevIrData = -1
let isExecutingSequence = false

basic.forever(function () {
    if (!isExecutingSequence) {
        let irData = IR.IR_read()
        if (irData == -1) {
            prevIrData = -1 // Réinitialiser prevIrData si aucune donnée IR n'est lue
        } else if (irData != prevIrData) {
            prevIrData = irData
            if (irData == 249) {
                basic.showArrow(ArrowNames.North)
                instructionSequence.push("forward")
                basic.pause(500)
                basic.clearScreen()
            } else if (irData == 89) {
                basic.showArrow(ArrowNames.West)
                instructionSequence.push("left")
                basic.pause(500)
                basic.clearScreen()
            } else if (irData == 185) {
                basic.showArrow(ArrowNames.East)
                instructionSequence.push("right")
                basic.pause(500)
                basic.clearScreen()
            } else if (irData == 121) {
                basic.showArrow(ArrowNames.South)
                instructionSequence.push("backward")
                basic.pause(500)
                basic.clearScreen()
            } else if (irData == 233) {
                // Commencer l'exécution de la séquence
                isExecutingSequence = true
                executeSequence()
            }
        }
    }
})

function executeSequence() {
    for (let i = 0; i < instructionSequence.length; i++) {
        let instruction = instructionSequence[i]
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
    isExecutingSequence = false // Permettre à la boucle principale de reprendre la lecture des données IR
    prevIrData = -1 // Réinitialiser prevIrData pour détecter de nouvelles entrées
}
