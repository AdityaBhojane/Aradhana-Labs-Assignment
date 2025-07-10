
export const createCrudRepository = (model) => {
    return {
        create: async (data) => {
            const newItem = new model(data);
            return await newItem.save();
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