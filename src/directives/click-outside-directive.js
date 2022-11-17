const directive = {
    mounted(el, binding) {
        el.__ClickOutSideHandler__ = (event) => {
            if (!(el == event.target || el.contains(event.target))) {
                binding.value(event)
            }
        }
        document.body.addEventListener("click", el.__ClickOutSideHandler__)

    },
    unmounted(el) {
        document.body.removeEventListener("click", el.__ClickOutSideHandler__)

    }
}

export default directive;