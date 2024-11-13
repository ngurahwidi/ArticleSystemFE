const crudPath = (feature) => {
    return {
        list: `/${feature}`,
        add: `/${feature}/add`,
        detail:`/${feature}/:id`,
        edit: `/${feature}/:id/edit`
    }
}

export default crudPath;