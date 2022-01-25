import * as mongoose from 'mongoose';
import {model} from 'mongoose';
import Comment from './Comment';


const postSchema =  new mongoose.Schema({
 user_id :{type:mongoose.Types.ObjectId,required:true},
 created_at:{type:Date,required:true,default:new Date()},
 updated_at:{type:Date,required:true,default:new Date()},
 content:{type:String,required:true},
 comments: [{type: mongoose.Types.ObjectId, ref: 'comments'}]
});

postSchema.virtual('commentcount').get(function(){
    return this.comments.length;
});

postSchema.post('remove',(async doc=>{

for(let id of (doc as any).comments){
await Comment.findOneAndDelete({_id:id});

}

}))

export default model('posts', postSchema);