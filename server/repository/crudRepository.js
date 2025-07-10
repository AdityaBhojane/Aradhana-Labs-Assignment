
export const createCrudRepository = (model) => {
    return {
        create: async (data) => {
            const response = await model.create(data);
            return response;
        },
        read: async (query) => {
            return await model.find(query);
        },
        update: async (id, data) => {
            return await model.findByIdAndUpdate(id, data, { new: true });
        },
        delete: async (id) => {
            return await model.findByIdAndDelete(id);
        }
    };
}