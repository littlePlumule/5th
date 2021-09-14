//關閉submit的作用
document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault()
    let hasError = false
    let values = {}

    const elements = document.querySelectorAll('.write__must')
    for (let element of elements) {
        const radios = element.querySelectorAll("input[type=radio]")
        const input = element.querySelector("input[type=text],input[type=tel],input[type=email]")
        let isValid = true
        if (input) {
            values[input.name] = input.value
            if (!input.value) {
                isValid = false
            }
        } else if (radios.length) {
            isValid = [...radios].some(radio => radio.checked)
            if (isValid) {
                let r = element.querySelector("input[type=radio]:checked")
                values[r.name] = r.value
            }
        } else {
            continue
        }
        if (!isValid) {
            element.classList.remove("write__hideError")
            hasError = true
        } else {
            element.classList.add("write__hideError")
        }
    }
    if (!hasError) {

        alert(JSON.stringify(values))
    }

})