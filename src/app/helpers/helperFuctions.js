module.exports = {
    getUserFromLocalStorage: () => {
        let packageType = ""
        let user = JSON.parse(localStorage.getItem('subscriber'))
        if (user?.subscriptionId?.packageType) {
            packageType = user?.subscriptionId?.packageType
        }
        return packageType;
    }

}