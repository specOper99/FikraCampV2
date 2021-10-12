exports.findById = (obj, id) => {
    return obj.find(val => val.id == id);
}