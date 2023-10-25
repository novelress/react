export const STATUS_OPTIONS = [
    "Not Released",
    "Released",
]

export const getStatusOptions = (options) => {
    return options.map(item => {
        return {
            value: item.toLowerCase().replace(" ", "_"),
            label: item,
        }
    })
 }

export const ADULT_OPTIONS = [
    "No",
    "Yes",
]

export const getAdultOptions = (options) => {
    return options.map(item => {
        return {
            value: item.toLowerCase().replace(" ", "_"),
            label: item,
        }
    })
 }