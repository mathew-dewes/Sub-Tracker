import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';
import { SERVER_URL } from '../config/env.js';


export const createSubscription= async (req, res, next)=>{
    
    try {
        const subscription = 
        await Subscription.create({
            ...req.body,
            user: req.user._id,
        });
       
        if (req.body.sendEmailReminder){
            const { workflowRunId } = await workflowClient.trigger({
                url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
                body: {
                  subscription: {
                    id: subscription.id,
                    renewalDate: subscription.renewalDate,
                    status: subscription.status,
                    user: {
                      email: req.user.email,
                      name: req.user.name,
                    },
                  },
                },
                headers: {
                  'content-type': 'application/json',
                },
                retries: 0,
              });
              
   
            return res.status(201).json({success: true, data: {subscription, workflowRunId}});
        }

     

        return res.status(201).json({success: true, data: {subscription}});

        
        
    } catch (error) {
        next(error);
        
    }
}


export const getUserSubscriptions = async (req, res, next)=>{
    try {
        if (req.user.id !== req.params.id){
            const error = new Error('You are not the owner of this account');
            error.status = 401;
        }

        const subscriptions = await Subscription.find({user: req.params.id});

        res.status(200).json({success: true, data: subscriptions});
    } catch (error) {
        next(error);
    }
}

export const getAllSubscriptions = async (__, res, next)=>{
    try {
        const subscriptions = await Subscription.find({});
        res.status(200).json({success: true, data: subscriptions})
    } catch (error) {
        next(error)
    }
}

export const deleteSubscription = async (req, res, next)=>{
    try {

        if (req.user.id !== req.params.id){
            const error = new Error('You are not the owner of this account');
            error.status = 401;

            await Subscription.findByIdAndDelete(req.params.subscriptionId);

            res.status(200).json({message: "Subscription deleted successfully"})
        }
    } catch (error) {
        next(error)
    }
}


export const getSubscriptionDetail = async (req, res, next)=>{
    try {
        const details = await Subscription.findById(req.params.id);
        res.status(200).json({success: true, data: details})
    } catch (error) {
        next(error)
    }
}