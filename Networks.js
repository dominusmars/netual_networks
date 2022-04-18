class Neron {
    constructor() {
        this.weight = (Math.random() * 2) - 1;
        this.bias = (Math.random() * 2) - 1;
        this.type = "Cosine"
        this.NetualFunction = (input) => {
            return (input * this.weight) + this.bias
        }
        this.getInput
    }
    calculate(input) {
        input = input ? input : this.getInput();
        switch (this.type) {
            case "Cosine":
                return Math.cos((input * this.weight) + this.bias)
            case "Tan":
                return Math.tan((input * this.weight) + this.bias)
            case "Sin":
                return Math.sin((input * this.weight) + this.bias)
            case "Custom":
                return this.NetualFunction(input)
            default:
                return (input * this.weight) + this.bias
        }
    }

    SetWeight(weight) {
        this.weight = weight;
    }
    SetBias(bias) {
        this.bias = bias;
    }
    getBias() {
        return this.bias;
    }
    getWeight() {
        return this.weight;
    }
}

class NetualNet {
    constructor(layers, inputs, outputs) {
        this.inputs = []
        for (var i = 0; i < inputs; i++) {
            this.inputs.push(new Neron)
        }
        this.outputs = []
        for (var i = 0; i < outputs; i++) {
            this.outputs.push(new Neron)
        }
        this.network = [this.inputs, this.outputs]
        for (var i = 0; i < layers; i++) {
            this.addLayer(inputs)
        }
    }
    addLayer(size) {
        this.network.splice(this.network.length - 1, 1);
        var layer = []
        for (var i = 0; i < size; i++) {
            layer.push(new Neron)
            layer[i].getInput = () => {
                var input = 0;
                for (var j = 0; j < this.network[this.network.length - 1].length; j++) {
                    input += this.network[this.network.length - 1][j].calculate()
                }
                return input;
            }
        }
        this.network.push(layer)
        for (var i = 0; i < this.outputs.length; i++) {
            this.outputs[i].getInput = () => {
                var input = 0;
                for (var j = 0; j < this.network[this.network.length - 1].length; j++) {
                    input += this.network[this.network.length - 1][j].calculate()
                }
                return input;
            }
        }
        this.network.push(this.outputs)
    }
    propergate() {

    }
    toString() {
        var string = "["
        for (var i = 0; i < this.network.length; i++) {
            string += "["
            for (var j = 0; j < this.network[i].length; j++) {
                string += "[" + this.network[i][j].getBias() + "," + this.network[i][j].getWeight() + "]\n"
            }
            string += "]\n"
        }
        string += "]"
        return string
    }
}

module.exports = NetualNet