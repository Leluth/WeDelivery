const KEYS ={
    package:'package',
    packageId:'packageId'
}

export const getCategoryCollection = ()=>([
    { id: '1', title: 'Regular Package' },
    { id: '2', title: 'Special Package' },
    { id: '3', title: 'Liquid Package' },
    { id: '4', title: 'Document' },
])

export function insertPackage(data) {
    let Package = getAllPackage();
    data['id'] = generatePackageId()
    Package.push(data)
    localStorage.setItem(KEYS.package,JSON.stringify(Package))
}

export function generatePackageId() {
    if (localStorage.getItem(KEYS.packageId) == null)
        localStorage.setItem(KEYS.packageId, '0')
    var id = parseInt(localStorage.getItem(KEYS.packageId))
    localStorage.setItem(KEYS.packageId, (++id).toString())
    return id;
}

export function getAllPackage() {
    if (localStorage.getItem(KEYS.package) == null)
        localStorage.setItem(KEYS.package, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.package));
}
