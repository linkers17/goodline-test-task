let smartgrid = require('smart-grid');

/* It's principal settings in smart grid project */
let settings = {
    filename: '_smart-grid',
    outputStyle: 'scss', /* less || scss || sass || styl */
    columns: 12, /* number of grid columns */
    offset: '3.6rem', /* gutter width px || % || rem */
    mobileFirst: false, /* mobileFirst ? 'min-width' : 'max-width' */
    container: {
        maxWidth: '960px', /* max-width оn very large screen */
        fields: '0' /* side fields */
    },
    breakPoints: {
        c995: {
            width: '995px', /* -> @media (max-width: 1100px) */
        },
        c767: {
            width: '767px'
        },
        c575: {
            width: '575px'
        },
        c479: {
            width: '479px'
        }
        /*c992: {
            width: '992px'
        },
        c768: {
            width: '768px'
        },
        c576: {
            width: '576px'
        },
        c480: {
            width: '480px'
        }*/
        /*sm: {
            width: '780px',
            fields: '1.5rem' /* set fields only if you want to change container.fields */
        //},
        /*xs: {
            width: '560px'
        }*/
        /* 
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
    }
};

smartgrid('./src/assets/scss/vendor', settings);