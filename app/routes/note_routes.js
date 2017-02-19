     // ---  mongoDB requires not just an ID as a string, but as an ID object or, as they call it, an ObjectID
     var ObjectID = require('mongodb').ObjectID


module.exports = function(app, db){

     // read a note
     app.get('/notes/:id', function(req, res){
        const id = req.params.id
        const details = {'_id': new ObjectID(id)}
        db.collection('notes').findOne(details, function(err, item) {
            if (err) {
                res.send({'error': 'An error has occured'})
            } else {
                res.send(item)
            }
        })

     })



    // creation d'une note
    app.post('/notes', function(req, res){
        // console.log(req.body)
        // res.send('Create a new note')
        const note = {text: req.body.body, title: req.body.title}
        db.collection('notes').insert(note, function(err, result){
            if (err) {
                res.send({'error': 'An error has occurred'})
            } else {
                // console.log(result);
                res.send(result.ops[0])
            }
        })

    })


    // suppression d'une note
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, function(err, item){
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send('Note ' + id + ' deleted!');
        } 
        });
    });


    // MAJ d'une note
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, function(err, result){
        if (err) {
            res.send({'error':'An error has occurred'});
        } else {
            res.send(note);
        } 
        });
    });




}