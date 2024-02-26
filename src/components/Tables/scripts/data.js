import { ref } from "vue"

export default function Data(options = {
    treeProps: {
        label: (data) => {
            return data.shortName || data.name
        },
    }
}) {

    const data = ref({ count: 0, rows: [] });

    const treeProps = options.treeProps

    const Done = (e) => {
        data.value = e
    }

    return { data, treeProps, Done, }
}