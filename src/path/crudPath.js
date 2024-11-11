export const crudPath = (feature) => {
    return {
        list: `/${feature}`,
        add: `/${feature}/add`,
        detail:`/${feature}/:id`,
        edit: `/${feature}/:id/edit`
    }
}

export const articlePath = crudPath('article')

export const categoryPath = crudPath('category')

export const tagPath = crudPath('tag')