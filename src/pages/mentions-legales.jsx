import React from 'react';
import { LazyMotion, m } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { loadMotionFeatures } from "@/lib/motion";

const baseCardClasses = 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md space-y-4 text-left';
const stackedCardClasses = `${baseCardClasses} mt-10`;
const linkClasses = 'text-indigo-600 dark:text-indigo-400 hover:underline';

export default function MentionsLegales() {
  return (
    <LazyMotion features={loadMotionFeatures}>
    <>
      <Helmet>
        <title>Mentions légales – Minimoji</title>
        <meta
          name="description"
          content="Retrouvez toutes les mentions légales du site Minimoji : éditeur, hébergeur, données personnelles, propriété intellectuelle et responsabilités."
        />
        <meta property="og:title" content="Mentions légales – Minimoji" />
        <meta
          property="og:description"
          content="Informations légales concernant le site Minimoji, son éditeur BREIZHSTORM – Meneust Raphaël, et les données personnelles collectées."
        />
        <meta property="og:url" content="https://www.minimoji.fr/mentions-legales" />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="max-w-3xl mx-auto px-6 py-12 text-center font-poppins text-gray-800 dark:text-gray-100">
        <m.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-8"
        >
          Mentions légales
        </m.h1>

        <div className={baseCardClasses}>
          <p>
            <strong>Nom commercial :</strong>
            <br />
            Minimoji – une marque éditée par <strong>BREIZHSTORM – Meneust Raphaël</strong>
          </p>

          <p>
            <strong>Statut juridique :</strong>
            <br />
            Entreprise individuelle (auto-entrepreneur)
          </p>

          <p>
            <strong>SIRET :</strong>
            <br />
            852 885 987 00010
          </p>

          <p>
            <strong>Adresse du siège social :</strong>
            <br />
            29 rue de la Pelleterie, 44000 Nantes, France
          </p>

          <p>
            <strong>Téléphone :</strong>
            <br />
            06 59 81 64 93
          </p>

          <p>
            <strong>Adresse e-mail :</strong>
            <br />
            hello@minimoji.fr
          </p>

          <p>
            <strong>Directeur de la publication :</strong>
            <br />
            Raphaël Meneust
          </p>

          <p>
            <strong>Nom de domaine :</strong>
            <br />
            www.minimoji.fr (enregistré via Hostinger)
          </p>

          <p>
            <strong>Conditions Générales d’Utilisation :</strong>
            <br />
            Consultables à l’adresse suivante :{' '}
            <a href="/cgu-cgv" className={linkClasses}>
              www.minimoji.fr/cgu
            </a>
          </p>
        </div>

        <div className={stackedCardClasses}>
          <p>
            <strong>Hébergeur du site :</strong>
          </p>
          <p>
            <strong>Vercel Inc.</strong>
            <br />
            440 N Barranca Ave #4133
            <br />
            Covina, CA 91723
            <br />
            États-Unis
            <br />
            <a href="https://vercel.com" className={linkClasses}>
              https://vercel.com
            </a>
          </p>
        </div>

        <div className={stackedCardClasses}>
          <p>
            <strong>Propriété intellectuelle :</strong>
          </p>
          <p>
            Le site <strong>www.minimoji.fr</strong>, son design, son identité visuelle ainsi que l’ensemble de son contenu (textes, illustrations, animations,
            code source, UX/UI, logo) sont des créations originales protégées au titre de la propriété intellectuelle.
          </p>
          <p>
            Ces éléments sont la propriété exclusive de <strong>BREIZHSTORM – Meneust Raphaël</strong>, sauf mention contraire. Toute reproduction, diffusion,
            modification ou exploitation sans autorisation écrite préalable est strictement interdite.
          </p>
          <p>
            Les vidéos animées produites à partir des dessins soumis par les utilisateurs peuvent être librement partagées à des fins non commerciales, notamment
            sur les réseaux sociaux, sous réserve de ne pas altérer le message, ni porter atteinte aux droits des tiers.
          </p>
          <p>
            La marque <strong>Minimoji</strong> est utilisée dans un cadre commercial mais n’est pas déposée à l’INPI à ce jour.
          </p>
        </div>

        <div className={stackedCardClasses}>
          <p>
            <strong>Données personnelles :</strong>
          </p>
          <p>
            Les informations collectées sur le site <strong>www.minimoji.fr</strong> via le formulaire « Créez votre dessin animé » (nom de l’enfant, prénom du parent,
            adresse e-mail, image(s) fournie(s), et message éventuel) sont strictement nécessaires au traitement de la demande et à la création d’une vidéo
            personnalisée.
          </p>
          <p>
            Ces données sont conservées pendant une durée fixe de <strong>6 mois</strong>, puis archivées de manière sécurisée. Elles peuvent être supprimées à tout
            moment sur simple demande de l’utilisateur par e-mail.
          </p>
          <p>
            Les données ne sont accessibles qu’à <strong>BREIZHSTORM – Meneust Raphaël</strong> et ne sont transmises à aucun tiers, partenaire, prestataire ou plateforme
            commerciale. Aucune donnée ne sera exploitée à des fins publicitaires ou partagée sans consentement explicite.
          </p>
          <p>
            Les fichiers sont hébergés sur un espace de stockage privé et sécurisé, chiffré, sans accès externe non autorisé.
          </p>
          <p>
            Conformément au RGPD, vous disposez d’un droit d’accès, de rectification, d’opposition et de suppression de vos données. Pour exercer vos droits, vous
            pouvez écrire à l’adresse suivante :{' '}
            <a href="mailto:hello@minimoji.fr" className={linkClasses}>
              meneust.r@gmail.com
            </a>
            .
          </p>
          <p>
            Le site <strong>n’utilise aucun cookie ni service de mesure d’audience</strong>.
          </p>
        </div>

        <div className={stackedCardClasses}>
          <p>
            <strong>Responsabilité :</strong>
          </p>
          <p>
            Minimoji s’efforce de maintenir le site accessible à tout moment. Toutefois, des interruptions temporaires peuvent survenir pour des raisons de maintenance,
            de mises à jour ou en cas de dysfonctionnement technique. Ces interruptions ne sauraient en aucun cas remettre en cause les commandes passées ni ouvrir
            droit à indemnisation.
          </p>
          <p>
            Le site contient uniquement un lien vers la plateforme de paiement sécurisée Stripe pour le traitement des commandes. Aucun autre service tiers ni contenu
            externe n’est embarqué.
          </p>
          <p>
            Toute tentative de contournement des dispositifs de sécurité (formulaire, validation d’images), d’exploitation malveillante (envoi de contenus abusifs ou
            illicites, injection de code, scrapping, etc.) est strictement interdite et pourra faire l’objet de poursuites judiciaires.
          </p>
          <p>
            Minimoji met tout en œuvre pour assurer l’exactitude et la mise à jour des informations présentées sur le site. Toutefois, certaines données (délais de
            livraison, prix, contenus éditoriaux) peuvent être modifiées à tout moment sans préavis, et ne constituent pas un engagement contractuel de la part de
            l’éditeur.
          </p>
        </div>

        <div className={stackedCardClasses}>
          <p>
            <strong>Contact :</strong>
          </p>
          <p>
            Pour toute question relative au site, à vos données personnelles ou aux présentes mentions légales, vous pouvez contacter l’éditeur à l’adresse suivante :{' '}
            <a href="mailto:hello@minimoji.fr" className={linkClasses}>
              meneust.r@gmail.com
            </a>
            .
          </p>
        </div>

        <div className={stackedCardClasses}>
          <p>
            <strong>Loi applicable &amp; juridiction compétente :</strong>
          </p>
          <p>
            Le présent site est soumis au droit français. En cas de litige, et à défaut de résolution amiable, compétence est attribuée aux tribunaux français compétents,
            conformément aux règles de droit commun.
          </p>
        </div>

        <div className={stackedCardClasses}>
          <p>
            <strong>Accessibilité :</strong>
          </p>
          <p>
            Le site <strong>www.minimoji.fr</strong> est conçu pour être accessible sur la plupart des navigateurs modernes. Si vous constatez un problème d’accessibilité ou
            un dysfonctionnement, vous pouvez le signaler à l’adresse suivante :{' '}
            <a href="mailto:hello@minimoji.fr" className={linkClasses}>
              meneust.r@gmail.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
    </LazyMotion>
  );
}
