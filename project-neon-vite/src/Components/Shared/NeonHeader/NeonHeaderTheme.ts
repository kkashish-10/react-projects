
const NeonHeaderTheme = {
    root: {
        '&.appBar': {
            boxShadow: '0px 0px 5px 1px #E0E0E0',
            position: 'static'
        },
        '&.toolBar': {
            background: 'white',
            minHeight: '20px',
            maxHeight: '57px',
        },
        '&.logo': {
            height: '57px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        '&.icon': {
            color: '416e8d',
            padding: '0.2rem',
            cursor: 'pointer'
        },
        '.user-icon-avatar': {
            backgroundColor: '#474a73',
            width: '1rem',
            // eslint-disable-next-line no-useless-computed-key
            ['@media (max-width:1920px)']: { width: '1rem', height: '1rem' },
            // eslint-disable-next-line no-useless-computed-key
            ['@media (max-width:1600px)']: { width: '1rem', height: '1rem' },
            // eslint-disable-next-line no-useless-computed-key
            ['@media (max-width:1366px)']: { width: '1rem', height: '1.4rem' }
        },
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:1920px)']: {
            '.userDivFont': { fontSize: '0.88rem' }
        },
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:1600px)']: {
            '.userDivFont': { fontSize: '0.75rem' }
        },
        // eslint-disable-next-line no-useless-computed-key
        ['@media (max-width:1366px)']: {
            '.userDivFont': { fontSize: '0.616rem' }
        },
        '.buildVersionDev': {
            // eslint-disable-next-line no-useless-computed-key
            ['@media (max-width:1920px)']: {
                lineHeight: '1.32rem', fontSize: '0.88rem'
            },
            // eslint-disable-next-line no-useless-computed-key
            ['@media (max-width:1600px)']: {
                lineHeight: '1.125rem', fontSize: '0.75rem'
            },
            // eslint-disable-next-line no-useless-computed-key
            ['@media (max-width:1366px)']: {
                lineHeight: '0.924rem', fontSize: '0.616rem'
            },
        },
        '.divider': {
            // eslint-disable-next-line no-useless-computed-key
            ['@media (max-width:1920px)']: { fontSize: '0.88rem' },
            // eslint-disable-next-line no-useless-computed-key
            ['@media (max-width:1600px)']: { fontSize: '1.875rem' },
            // eslint-disable-next-line no-useless-computed-key
            ['@media (max-width:1366px)']: { fontSize: '0.616rem' },
        },
        '.build-version-avatar': { backgroundColor: 'gold', padding: '0.1rem 0.4rem', borderRadius: '3px' }
    }
}

export default NeonHeaderTheme;