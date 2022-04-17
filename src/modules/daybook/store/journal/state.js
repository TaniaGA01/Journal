// Le state est reactif et quand il change tous les components où il se trouve

export default () => ({ 
    isLoading: true,
    entries: [
        {
            id: '1',
            date: new Date().toDateString(),
            text: 'Magna nulla nisi qui dolor incididunt aute excepteur pariatur eu. Lorem eiusmod reprehenderit ipsum reprehenderit exercitation laborum anim. Reprehenderit sint id adipisicing sunt nulla et sunt. Incididunt ea pariatur officia ex minim. Minim aute deserunt tempor reprehenderit Lorem non ad officia non nostrud magna. Eiusmod tempor laborum velit pariatur consectetur pariatur dolor est reprehenderit esse consequat nisi ea. Enim ullamco deserunt nisi id fugiat magna.',
            picture:null
        },
        {
            id: '2',
            date: new Date().toDateString(),
            text: 'Officia culpa sunt eu tempor mollit occaecat. Tempor ipsum laboris exercitation enim est in. Consectetur culpa qui sint sunt tempor fugiat veniam sint sit quis pariatur. Est excepteur ullamco exercitation duis amet nisi pariatur veniam cillum aute.',
            picture:null
        },
        {
            id: '3',
            date: new Date().toDateString(),
            text: 'Laborum ex et deserunt ea reprehenderit enim non Lorem in deserunt. Commodo ad nostrud fugiat sunt nisi Lorem. Veniam ad commodo minim mollit reprehenderit duis consectetur consequat excepteur Lorem culpa id. Non consequat commodo pariatur tempor pariatur ad pariatur nisi non adipisicing incididunt mollit officia. Officia laboris adipisicing in culpa aliqua occaecat ex nostrud excepteur deserunt ullamco id.',
            picture:null
        },
    ]
 })