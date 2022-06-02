import type { NextApiRequest, NextApiResponse } from "next";

type HTTPMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
// NextJS API function
type NextJSFunction = (req: NextApiRequest, res: NextApiResponse) => any;
// { "GET": (req, res) => {}, "POST": (req, res) => {}, ... }
type ObjectContainingHTTPMethods = Record<HTTPMethod, NextJSFunction>;
// global map that will have all the handlers
const handlers = new Map<string, ObjectContainingHTTPMethods>();

export const http = (handlerName: string) => {
    // prop is the name of the method, which we will force to be an HTTPMethod
    // descriptor is the actual method itself, which we will just add to the route handlers map so we can call it later during genAPIRoute
    return (_target: unknown, prop: HTTPMethod, descriptor: PropertyDescriptor) => {
        // see if we've registered any handlers in this class before, otherwise init empty object
        const existingNameHandler = handlers.get(handlerName) ?? ({} as ObjectContainingHTTPMethods);
        // add http method to this handler
        existingNameHandler[prop] = descriptor.value;
        // replace handler value
        handlers.set(handlerName, existingNameHandler);
    };
};

// this is what will be used to "dynamically" handle api requests
// accepts the name of the route handler
export const genAPIRoute = (handlerName: string, methodNotFoundPayload: any = { error: { message: "This method is not implemented." } }) => {
    const handler = handlers.get(handlerName);
    if (!handler) throw new Error("Missing handler!");

    // return a function that next.js will accept
    return (req: NextApiRequest, res: NextApiResponse) => {
        // get the handler for this method, otherwise error
        const methodHandler = handler[req.method as HTTPMethod];
        return methodHandler ? methodHandler(req, res) : res.status(405).json(methodNotFoundPayload);
    };
};
