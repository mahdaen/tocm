// CREATING A DEFAULT RESPONSIVE CLASS DEFINITIONS.
// ---------------------------------------------------------------------


// Adapting fluid layouts using Adobe Edge Reflow.
$build('.clearfix', {
    clear: 'both'
}).on('before & after', {content: '""', display: 'table'});
