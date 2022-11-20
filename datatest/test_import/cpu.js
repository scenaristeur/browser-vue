class CPU {
  constructor(text) {
    this.text = text
    this.log()
    console.log("in constructor", this.text)
  }

  log(){
    console.log("in log",this.text)
  }
}




module.exports = CPU;
