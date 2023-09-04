const localTodoArr = [
  {
    id: '4Rtcv4auu4AL7odoVMgF',
    title: 'go for a walk ',
    date: 1693557232433,
    done: false,
    isEditOn: false,
  },
  {
    id: '5tSaYpk9UREzGMzNb8pl',
    done: true,
    date: 1693558498881,
    title: 'sdfsdfsdf',
    isEditOn: false,
  },
  {
    id: 'bJ1axOMWv2YZ35uN4TuJ',
    done: false,
    date: '',
    title: 'Do a 100 pushups',
    isEditOn: false,
  },
  {
    id: 'bVOsNmWmOFqq5cRu5k08',
    done: true,
    date: '',
    title: 'Go to Shopping',
    isEditOn: false,
  },
  {
    id: 'hFwRHpCzOKEnCRd7r9Of',
    title: 'get flowers',
    done: false,
    date: 1693556645738,
    isEditOn: false,
  },
  {
    id: 'tKwDlYzFJnJvpA3BHnzl',
    title: 'Buy Eggs',
    date: '',
    done: true,
    isEditOn: false,
  },
];

function makeTodoTrue(idToMakeTrue) {
  const pakeistas = localTodoArr.map((tObj) => {
    return tObj;
  });
  console.log('pakeistas ===', pakeistas);
}
makeTodoTrue('tKwDlYzFJnJvpA3BHnzl');
