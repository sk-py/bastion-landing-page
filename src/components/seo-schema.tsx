export function SeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://bastion.skpy.in/#website",
        url: "https://bastion.skpy.in/",
        name: "Bastion",
        alternateName: "Bastion Server Management",
        description:
          "Open-source, self-hosted server management console.",
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://bastion.skpy.in/#software",
        name: "Bastion",
        url: "https://bastion.skpy.in/",
        applicationCategory: "DeveloperApplication",
        applicationSubCategory: "Server Management",
        operatingSystem: "Linux",
        description:
          "Open-source, self-hosted server management console for browser-based SSH access, file transfer, and session recording.",
        license: "https://opensource.org/licenses/MIT",
        isAccessibleForFree: true,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  );
}