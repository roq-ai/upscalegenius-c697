import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware, notificationHandlerMiddleware } from 'server/middlewares';
import { integrationValidationSchema } from 'validationSchema/integrations';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  const allowed = await prisma.integration
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  if (!allowed) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  switch (req.method) {
    case 'GET':
      return getIntegrationById();
    case 'PUT':
      return updateIntegrationById();
    case 'DELETE':
      return deleteIntegrationById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getIntegrationById() {
    const data = await prisma.integration.findFirst(convertQueryToPrismaUtil(req.query, 'integration'));
    return res.status(200).json(data);
  }

  async function updateIntegrationById() {
    await integrationValidationSchema.validate(req.body);
    const data = await prisma.integration.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    await notificationHandlerMiddleware(req, data.id);
    return res.status(200).json(data);
  }
  async function deleteIntegrationById() {
    await notificationHandlerMiddleware(req, req.query.id as string);
    const data = await prisma.integration.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
