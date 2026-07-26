import type { NextRequest } from "next/server";
import { json, requireSession } from "@/lib/api";
import {
  COUNTRIES,
  FUTURE_COUNTRIES,
  INDUSTRIES,
  PIPELINE_STAGES,
  PRIMARY_COUNTRIES,
  SALESFORCE_PRODUCTS,
  SIGNAL_TYPES,
  STAKEHOLDER_PERSONAS,
} from "@/modules/core/taxonomy";
import { ACCOUNT_CRITERIA, SIGNAL_WEIGHTS } from "@/modules/scoring/weights";

/** GET /api/v1/meta — taxonomy + scoring configuration for API consumers. */
export async function GET(req: NextRequest) {
  const auth = await requireSession(req);
  if ("response" in auth) return auth.response;
  return json({
    countries: COUNTRIES,
    primaryCountries: PRIMARY_COUNTRIES,
    futureCountries: FUTURE_COUNTRIES,
    industries: INDUSTRIES,
    pipelineStages: PIPELINE_STAGES,
    salesforceProducts: SALESFORCE_PRODUCTS,
    signalTypes: SIGNAL_TYPES,
    stakeholderPersonas: STAKEHOLDER_PERSONAS,
    scoring: {
      signalWeights: SIGNAL_WEIGHTS,
      accountCriteria: ACCOUNT_CRITERIA,
    },
  });
}
