import {createAsyncThunk} from '@reduxjs/toolkit'
import {AppDispatch, RootState} from '../store'

import {DateTime} from 'luxon'

import * as client from '../clients/tasks'
import {taskActions} from '../reducers'

export const refreshTasks = createAsyncThunk<
  void,
  undefined,
  {state: RootState; dispatch: AppDispatch}
>(
  'tasks/refreshTasks',
  async (_, thunkAPI): Promise<void> => {
    const tasks = await client.getTasks()
    thunkAPI.dispatch(taskActions.tasksUpdated(tasks))
  }
)

export const stopTask = createAsyncThunk<
  void,
  client.UUID,
  {state: RootState; dispatch: AppDispatch}
>(
  'tasks/stopTask',
  async (taskId, thunkAPI): Promise<void> => {
    thunkAPI.dispatch(
      taskActions.updateTask({
        taskId,
        update: {
          start: '',
          end: DateTime.utc().toISO(),
        },
      })
    )
    return await client.stopTask(taskId)
  }
)

export const deleteTask = createAsyncThunk<
  void,
  client.UUID,
  {state: RootState; dispatch: AppDispatch}
>(
  'tasks/deleteTask',
  async (taskId, thunkAPI): Promise<void> => {
    return await client.deleteTask(taskId)
  }
)

export const startTask = createAsyncThunk<
  void,
  client.UUID,
  {state: RootState; dispatch: AppDispatch}
>(
  'tasks/startTask',
  async (taskId, thunkAPI): Promise<void> => {
    thunkAPI.dispatch(
      taskActions.updateTask({
        taskId,
        update: {
          start: DateTime.utc().toISO(),
        },
      })
    )
    return await client.startTask(taskId)
  }
)

export const completeTask = createAsyncThunk<
  void,
  client.UUID,
  {state: RootState; dispatch: AppDispatch}
>(
  'tasks/completeTask',
  async (taskId, thunkAPI): Promise<void> => {
    thunkAPI.dispatch(
      taskActions.updateTask({
        taskId,
        update: {
          status: 'completed',
        },
      })
    )
    return await client.completeTask(taskId)
  }
)

export const commitTask = createAsyncThunk<
  void,
  client.UUID,
  {state: RootState; dispatch: AppDispatch}
>(
  'tasks/commitTask',
  async (taskId, thunkAPI): Promise<void> => {
    const taskState = thunkAPI.getState()
    const thisTask = taskState.tasks?.find((task) => task.uuid === taskId)

    if (!thisTask) {
      throw Error(`Could not find task by ID ${taskId}`)
    }

    return await client.updateTask(thisTask)
  }
)
