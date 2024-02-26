import { ref } from "vue"

export default function Filter() {
    const filter = ref({})

    const SetFilter = (e) => {
        if (e.page)
            filter.value = e
    }

    const ClearFilter = () => {
        filter.value = {}
    }

    return { filter, SetFilter, ClearFilter }


}