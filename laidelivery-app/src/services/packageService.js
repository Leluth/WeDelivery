const KEYS ={
    packages:'packages',
    packageId:'packageId',
}

export const getCategoryCollection = ()=>([
    { id: 'Regular Package', title: 'Regular Package' },
    { id: 'Special Package', title: 'Special Package' },
    { id: 'Liquid Package', title: 'Liquid Package' },
    { id: 'Document', title: 'Document' },
])

export function insertPackage(data) {
    let packages = getAllPackage();
    data['id'] = generatePackageId()
    packages.push(data)
    localStorage.setItem(KEYS.packages,JSON.stringify(packages))
}

export function updatePackage(data) {
    let packages = getAllPackage();
    let recordIndex = packages.findIndex(x => x.id === data.id);
    packages[recordIndex] = { ...data }
    localStorage.setItem(KEYS.packages, JSON.stringify(packages));
}

export function deletePackage(id) {
    let packages = getAllPackage();
    packages = packages.filter(x => x.id !== id)
    localStorage.setItem(KEYS.packages, JSON.stringify(packages));
}
export function generatePackageId() {
    if (localStorage.getItem(KEYS.packageId) == null)
        localStorage.setItem(KEYS.packageId, '0')
    var id = parseInt(localStorage.getItem(KEYS.packageId))
    localStorage.setItem(KEYS.packageId, (++id).toString())
    return id;
}


export function getAllPackage() {
    if (localStorage.getItem(KEYS.packages) == null)
        localStorage.setItem(KEYS.packages, JSON.stringify([]))
    let packages = JSON.parse(localStorage.getItem(KEYS.packages));
    //map categoryID to category title
    let categories = getCategoryCollection();
    return packages.map(x => ({
        ...x,
        category: categories[x.categoryId - 1].title

    }
    ))
}