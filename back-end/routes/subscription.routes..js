import { Router } from "express";
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions, getAllSubscriptions, deleteSubscription, getSubscriptionDetail } from "../controllers/subscription.controller.js";

const subscriptionRouter = Router();


subscriptionRouter.get('/', getAllSubscriptions);
subscriptionRouter.post('/', authorize, createSubscription);
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);
subscriptionRouter.delete('/:subscriptionId', authorize, deleteSubscription);
subscriptionRouter.get('/detail/:id', authorize, getSubscriptionDetail)





subscriptionRouter.put('/:id/cancel', (req, res) => {
    res.send({ title: "CANCEL subscription" })
})

subscriptionRouter.get('/upcoming-renwals', (req, res) => {
    res.send({ title: "GET upcoming renewals" })
})

export default subscriptionRouter;