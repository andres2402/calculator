class Calculator {
  constructor(displayElement) {
    this.display = displayElement;
    this.currentExpression = "0";
    this.initEventListeners();
  }

  initEventListeners() {
    document.querySelectorAll(".btn").forEach((button) => {
      button.addEventListener("click", () => this.handleButtonClick(button));
    });
  }

  handleButtonClick(button) {
    const buttonText = button.textContent;

    switch (button.id) {
      case "c":
        this.clear();
        break;
      case "borrar":
        this.backspace();
        break;
      case "igual":
        this.calculate();
        break;
      default:
        this.addToExpression(buttonText);
    }
  }

  clear() {
    this.currentExpression = "0";
    this.updateDisplay();
  }

  backspace() {
    if (
      this.currentExpression.length === 1 ||
      this.currentExpression === "Error!"
    ) {
      this.clear();
    } else {
      this.currentExpression = this.currentExpression.slice(0, -1);
      this.updateDisplay();
    }
  }

  addToExpression(value) {
    if (this.currentExpression === "0" || this.currentExpression === "Error!") {
      this.currentExpression = value;
    } else {
      this.currentExpression += value;
    }
    this.updateDisplay();
  }

  calculate() {
    try {
      const result = new Function(`return ${this.currentExpression}`)();
      this.currentExpression = Number(result)
        .toFixed(8)
        .replace(/\.?0+$/, "");
      this.updateDisplay();
    } catch {
      this.currentExpression = "Error!";
      this.updateDisplay();
    }
  }

  updateDisplay() {
    this.display.textContent = this.currentExpression;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const display = document.querySelector(".pantalla");
  new Calculator(display);
});
