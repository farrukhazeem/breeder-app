export default function (state = { isLoading: false }, action) {
    switch (action.type) {
        case 'ENABLE':
            return { isLoading: true };
        case 'DISABLE':
            return { isLoading: false };
        default: 
            return state;
    }
}