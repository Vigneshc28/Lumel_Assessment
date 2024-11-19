export const calculateSubtotal = (children) => {
    return children.reduce((total, child) => total + child.value, 0);
};

export const calculateVariance = (original, updated) => {
    return ((updated - original) / original) * 100;
};
