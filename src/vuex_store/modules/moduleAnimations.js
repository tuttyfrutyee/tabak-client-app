
//EXPORTING MODULE

export default {
    namespaced: true,
    state : {
        todo_animations : {
            immediate : {
                icon : false
            },
            lazy : {
                icon : false
            }
        }
    },
    mutations:{

        addTodoAnimation(state,details){
            state.todo_animations[details.type][details.name] = true 
        },
        removeTodoAnimation(state,details){
            state.todo_animations[details.type][details.name] = false
        }

    },
    actions : {
        addTodoAnimation(context,details){
            context.commit("addTodoAnimation",details)
        },
        removeTodoAnimation(context,details){
            context.commit("removeTodoAnimation",details)
        }
    }
}

//helper Functions